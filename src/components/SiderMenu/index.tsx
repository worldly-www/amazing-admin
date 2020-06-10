import React, { SFC } from 'react';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const SiderMenu: SFC<{}> = () => (
  <Sider
    width={200}
    theme="light"
  >
    <Menu
      mode="inline"
      style={{height: '100vh'}}
      defaultSelectedKeys={['2']}
    >
      <SubMenu
          key="sub1"
          title="subnav 1"
      >
        <Item key="1">option1</Item>
        <Item key="2">option2</Item>
        <Item key="3">option3</Item>
        <Item key="4">option4</Item>
      </SubMenu>
    </Menu>
  </Sider>
);

export default SiderMenu;