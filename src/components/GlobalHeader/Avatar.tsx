import React, { FC } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './index.less';

const AvatarDropdown: FC = () => {
  const avatarMenu = (
    <Menu style={{ minWidth: 160 }}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={avatarMenu}>
      <div className="action account">
        <Avatar />
        <span className="account__name">123</span>
      </div>
    </Dropdown>
  );
};

export default AvatarDropdown;
