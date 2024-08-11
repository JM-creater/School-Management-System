import { Layout } from "antd";
import { footerStyle } from "../../themes/main-styles";

const { Footer } = Layout;

export const FooterComponent: React.FC = () => {
  return (
    <Footer style={footerStyle}>
      School Management System ©{new Date().getFullYear()} Created by Joseph Martin Garado
    </Footer>
  );
};