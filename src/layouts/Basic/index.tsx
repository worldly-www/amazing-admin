import React, { FC, useState, useCallback, useMemo } from 'react';
import { IRouteComponentProps } from 'umi';
import { Layout, PageHeader } from 'antd';
import GlobalHeader from '@/components/GlobalHeader';
import SiderMenu from '@/components/SiderMenu';
import { findRoute } from '@/utils';
import './index.less';

const { Content } = Layout;

const BasicLayout: FC<IRouteComponentProps> = ({
  route = {},
  location,
  children,
}) => {
  const { pathname } = location;
  const [state, setState] = useState(false);
  const handleCollapsed = useCallback(collapsed => {
    setState(collapsed);
  }, []);

  const curRouteInfo = useMemo(() => {
    return findRoute(pathname, route.routes) ?? {};
  }, [pathname]);

  const selectedKeys = useMemo(() => {
    if (curRouteInfo.path) {
      return [curRouteInfo.path];
    }
    return [];
  }, [curRouteInfo.path]);

  return (
    <Layout className="basic-layout">
      <SiderMenu
        selectedKeys={selectedKeys}
        collapsed={state}
        routes={route.routes}
      />
      <Layout>
        <GlobalHeader onChange={handleCollapsed} />
        <Content>
          <PageHeader className="layout-header" title={curRouteInfo.name} />
          <div className="layout-content">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
