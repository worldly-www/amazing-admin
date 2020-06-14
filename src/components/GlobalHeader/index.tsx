import React, { FC, ReactElement } from 'react';
import { Link, IRoute } from 'umi';
import { Layout, Menu } from 'antd';
import './index.less';

const { Header } = Layout;

type GlobalHeaderProps = {
  title?: string | ReactElement;
  selectedKeys: Array<string>;
  routes: Array<IRoute>;
};

const GlobalHeader: FC<GlobalHeaderProps> = ({
  routes = [],
  selectedKeys = []
}) => {
  return (
    <Header className="global-header">
      <h1 className="logo">
        <img src="" alt=""/>
      </h1>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={selectedKeys}
      >
        {routes.map(({ name, path }) => (
          <Menu.Item key={path}><Link to={path as string}>{name}</Link></Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default GlobalHeader;
