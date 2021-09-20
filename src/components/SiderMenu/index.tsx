import React, { FC } from 'react';
import { Link, IRoute } from 'umi';
import { Layout, Menu } from 'antd';
import Icon from './Icon';
import './index.less';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

function renderItem(routes: Array<IRoute> = []) {
  return routes.map(({ name, path = '', routes: subRoutes, icon }) => {
    if (Array.isArray(subRoutes) && subRoutes.length) {
      return (
        <SubMenu key={path} title={name} icon={<Icon type={icon} />}>
          {renderItem(subRoutes)}
        </SubMenu>
      );
    }
    return (
      <Item key={path} icon={<Icon type={icon} />}>
        <Link to={path}>{name}</Link>
      </Item>
    );
  });
}

interface ISiderMenuProps {
  selectedKeys: Array<string>;
  collapsed: boolean;
  routes?: Array<any>;
}

const SiderMenu: FC<ISiderMenuProps> = ({
  selectedKeys = [],
  collapsed = false,
  routes,
}) => {
  return (
    <Sider
      collapsible
      trigger={null}
      width={200}
      theme="dark"
      className="global-sider"
      collapsed={collapsed}
    >
      <h1 className="logo">
        <img src="" alt="" />
      </h1>
      <Menu
        theme="dark"
        mode="inline"
        style={{ height: '100vh' }}
        selectedKeys={selectedKeys}
      >
        {renderItem(routes)}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
