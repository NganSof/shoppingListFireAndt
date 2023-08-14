import { FC } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import App from "../App";

export const Admin: FC = () => {
  const listMenu: any = ["product", "user"];
  const navi = useNavigate();

  return (
    <div>
      <Tabs
        onChange={(e?: string | number) => {
          switch (e) {
            case 0:
              navi("/product");
              break;
            case 1:
              navi(`/user`);
              break;
            default:
              break;
          }
        }}
        defaultActiveKey="0"
        tabPosition="left"
        style={{ height: "100vh" }}
        items={listMenu?.map((item: string, i: number) => {
          return {
            label: `${item}`.toUpperCase(),
            key: +i,
            children: <App />,
          };
        })}
      />
    </div>
  );
};
