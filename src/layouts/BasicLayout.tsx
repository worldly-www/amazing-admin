import React, { FC, useMemo } from 'react';
import { IRoute, Location } from 'umi';
import { Layout } from 'antd';
import GlobalHeader from '@/components/GlobalHeader';
import SiderMenu from '@/components/SiderMenu';
import { getMatchMenuData } from '@/utils';
import './BasicLayout.less';

const { Content } = Layout;

interface IBasicLayoutProps {
  route: IRoute,
  location: Location,
}

const BasicLayout: FC<IBasicLayoutProps> = ({
  route = {},
  location,
  children,
}) => {
  const { pathname } = location;
  const headerRoutes = useMemo(() => (
    (route.routes ?? []).map(({ component, exact, routes, ...args }) =>(args))
  ), [route]);

  const selectedKeys = useMemo(() => getMatchMenuData(pathname, headerRoutes).map(({ path }) => path) as Array<string>, [pathname, headerRoutes]);

  const siderRoutes = useMemo(() => (
    getMatchMenuData(pathname, route.routes).map(({ routes }) => routes)[0]
  ), [route.routes, pathname]);

  return (
    <Layout className="basic-layout">
      <GlobalHeader
        selectedKeys={selectedKeys}
        routes={headerRoutes}
      />
      <Layout>
        <SiderMenu
          routes={siderRoutes}
        />
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
