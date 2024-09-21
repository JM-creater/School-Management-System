import { 
  Layout, 
  MenuProps, 
  theme 
} from 'antd';
import { 
  contentBgColor, 
  shadowStyle, 
  sidebarBgColor 
} from './themes/colors/main-colors';
import { useEffect, useState } from 'react';
import { FooterComponent } from './components/footer/footer';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb';
import { Sidebar } from './components/sidebar/sidebar';
import { useItemMenu } from '../../hooks/use-item-menu';

import * as styles from './themes/main-styles';
import { Spinner } from '../../components';

const { Header, Content } = Layout;

export type MenuItem = Required<MenuProps>['items'][number];

const MainScreen = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { 
    renderContent, 
    renderHeader 
  } = useItemMenu();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <Layout style={{ 
        ...styles.minHeightLayout, 
        backgroundColor: sidebarBgColor, 
        boxShadow: shadowStyle 
      }}
    >
      <Sidebar 
        collapsed={collapsed} 
        onCollapse={setCollapsed} 
      />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: 'margin-left 0.3s ease',
          backgroundColor: contentBgColor,
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: shadowStyle,
        }}
      >
        <Header
          style={{
            padding: '0 20px',
            background: colorBgContainer,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px 10px 0 0',
            boxShadow: shadowStyle,
          }}
        >
          <h2>{renderHeader()}</h2>
        </Header>
        <Content 
          style={{ 
            ...styles.contentStyle, 
            padding: '24px 32px' 
          }}
        >
          <BreadcrumbComponent />
          <div
            style={{
              padding: '24px',
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: shadowStyle,
            }}
          >
           {isLoading ? <Spinner /> : renderContent()}
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default MainScreen;
