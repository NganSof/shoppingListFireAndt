import { Button } from "antd";
import { FC, useState, memo, useMemo } from "react";
import { ModelCreateProduct } from "../component/ModelCreateProduct";
import { productType } from "../type/product";

export const MenuProduct: FC<{ handleDel: any; selecAllDele: productType[] }> =
  memo(({ ...props }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [disDel, setdisDel] = useState<boolean>(true);
    const { handleDel, selecAllDele } = props;

    useMemo(() => {
      if (selecAllDele.length === 0) {
        setdisDel(true);
      } else {
        setdisDel(false);
      }
    }, [selecAllDele]);

    // create Modal
    const showModal = () => {
      setOpenModal(!openModal);
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          margin: "30px 25px",
        }}
      >
        <div>
          <Button
            disabled={disDel}
            onClick={handleDel}
            style={{ marginRight: 20 }}
          >
            Xóa tất cả
          </Button>
          <Button onClick={showModal}>Create Product</Button>
          {openModal ? <ModelCreateProduct open={openModal} /> : ""}
        </div>
      </div>
    );
  });
