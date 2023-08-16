import { FC, useEffect, useState, Fragment, useMemo } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "@firebase/firestore";
import { firestore } from "../../firebase";
import { productType } from "../../type/product";
import { Table, Modal, Alert } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { MenuProduct } from "../../template/MenuProduct";

const { Column } = Table;
const { confirm } = Modal;

export const Product: FC = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [alerState, setAlerState] = useState<JSX.Element>(<></>);
  const [SeleDel, setSeleDel] = useState([]);
  const productCollection = collection(firestore, "product");
  // deleted all
  const [selectedRowAll, setSelectedRowAll] = useState<productType[]>([]);

  useEffect(() => {
    onSnapshot(productCollection, (snapshot: any) => {
      setProducts(
        snapshot.docs.map((doc: any) => ({
          id: doc.id,
          key: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, [productCollection]);

  // show modal Deleted key
  const showConfirm = (nameDel: productType[]) => {
    nameDel.forEach((item: productType) => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <p>Bạn đã xác nhận xóa sản phẩm tên {item.name}</p>,
        onOk() {
          deleteDoc(doc(productCollection, `${item.id}`));
        },
        onCancel() {
          //  xét lại được uncheck của checkbox
          // window.location.reload();
        },
      });
    });
  };

  // delete all
  const handleDelAll = () => {
    let nameDele: string[] = [];
    selectedRowAll?.forEach((item: productType) => {
      nameDele.push(item.name);
      // xóa trực tiếp db
      deleteDoc(doc(productCollection, `${item.id}`));
      setAlerState(
        <Alert
          message={`Xóa thành công sản phẩm ${nameDele.join(" , ")}`}
          type="success"
        ></Alert>
      );
      setTimeout(() => {
        setAlerState(<></>);
      }, 2000);
    });
    // load lại mảng
    setSelectedRowAll([]);
    return clearTimeout;
  };

  // checkbox
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: productType[]) => {
      showConfirm(selectedRows);
      setSelectedRowAll(selectedRows);
    },
  };

  const data: productType[] = useMemo(
    () =>
      products?.map((item: productType) => {
        return item;
      }),
    [products]
  );

  return (
    <Fragment>
      <MenuProduct handleDel={handleDelAll} selecAllDele={selectedRowAll} />
      {alerState}
      <Table
        dataSource={data}
        pagination={{ defaultPageSize: 2 }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      >
        <Column
          title="STT"
          dataIndex="id"
          key="id"
          width={250}
          align="center"
        />
        <Column
          title="Tên sản phẩm"
          dataIndex="name"
          key="name"
          width={250}
          align="center"
        />
        <Column
          title="Hình ảnh"
          dataIndex="images"
          key="images"
          width={450}
          align="center"
          render={(value?: string) => {
            return <img src={value} alt="" width={350} height={350} />;
          }}
        />
        <Column
          title="Mô tả"
          dataIndex="description"
          width={250}
          key="description"
          align="center"
          render={(recod) => {
            return (
              <div style={{ wordBreak: "break-word", width: 200 }}>{recod}</div>
            );
          }}
        />
        <Column title="Loại" dataIndex="type" width={250} align="center" />
      </Table>
    </Fragment>
  );
};
