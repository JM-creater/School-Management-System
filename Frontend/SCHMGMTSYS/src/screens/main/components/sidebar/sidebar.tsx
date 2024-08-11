import { Layout, Menu } from "antd";
import { fixedFullHeightStyle } from "../../themes/main-styles";
import { items } from "../items/menu-items";
import { SidebarProps } from "./props/sidebar-props";
import { useItemMenu } from "../../../../hooks/use-item-menu";

const { Sider } = Layout;

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {

    const { selectedKeyMenu, handleChangeKey, handleChangeHeader  } = useItemMenu();

    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={fixedFullHeightStyle}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[selectedKeyMenu]}
          mode="inline"
          items={items}
          onClick={(e) => {
            handleChangeKey(e);
            handleChangeHeader(parseInt(e.key));
          }}
        />
      </Sider>
  );
};