import React, { FC } from 'react';
import { IRoute } from 'umi';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

function renderItem (routes: Array<IRoute> = []) {
  return routes.map(({ name, path, routes: subRoutes }) => {
    if (Array.isArray(subRoutes) && subRoutes.length) {
      return (
        <SubMenu
          key={path}
          title={name}
        >
          {renderItem(subRoutes)}
        </SubMenu>
      )
    }
    return <Item key={path}>{name}</Item>;
  });
}

interface ISiderMenuProps {
  routes?: Array<IRoute>
}

const SiderMenu: FC<ISiderMenuProps> = ({
  routes,
}) => {
  return (
    <Sider
      width={200}
      theme="light"
    >
      <Menu
        mode="inline"
        style={{ height: '100vh' }}
        defaultSelectedKeys={['2']}
      >
        {renderItem(routes)}
      </Menu>
    </Sider>
  )
};

export default SiderMenu;
