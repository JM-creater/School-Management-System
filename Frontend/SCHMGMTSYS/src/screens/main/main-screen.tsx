import { 
  Layout, 
  theme 
} from 'antd';
import { 
  contentBgColor, 
  shadowStyle, 
  sidebarBgColor 
} from './themes/colors/main-colors';
import React, { useState } from 'react';
import { FooterComponent } from './components/footer/footer';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb';
import { Sidebar } from './components/sidebar/sidebar';
import { useItemMenu } from '../../hooks/use-item-menu';
import { observer } from 'mobx-react-lite';

import * as styles from './themes/main-styles';

const { Header, Content } = Layout;

export const MainScreen: React.FC = observer(() => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { 
    renderContent, 
    renderHeader 
  } = useItemMenu();

  return (
    <Layout style={{ 
        ...styles.minHeightLayout, 
        backgroundColor: sidebarBgColor, 
        boxShadow: shadowStyle 
      }}
    >
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
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
            {renderContent()}
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </Layout>
  );
});
