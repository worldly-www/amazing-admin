import React, { FC, ReactElement } from 'react';
import { Link } from 'umi';
import { Layout, Menu } from 'antd';
import './index.less';

const { Header } = Layout;

type GlobalHeaderProps = {
  title?: string | ReactElement
};

const GlobalHeader: FC<GlobalHeaderProps> = () => (
  <Header className="global-header">
    <h1 className="logo">
      <img src="" alt=""/>
    </h1>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1"><Link to="/home">home</Link></Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  </Header>
);

export default GlobalHeader;
