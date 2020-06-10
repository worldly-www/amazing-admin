import React, { FC } from 'react';
import { Layout } from 'antd';
import GlobalHeader from '@/components/GlobalHeader';
import SiderMenu from '@/components/SiderMenu';
import './BasicLayout.less';

const { Content } = Layout;

const BasicLayout: FC<{}> = ({
  children
}) => {
  return (
    <Layout className="basic-layout">
      <GlobalHeader />
      <Layout>
        <SiderMenu />
        <Layout>
          <Content className="layout-main">
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
};

export default BasicLayout;
