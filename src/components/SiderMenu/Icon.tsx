import React, { FC } from 'react';
import {
  UserOutlined,
  SettingOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

interface IconProps {
  type: string;
}

interface IconType {
  [key: string]: typeof UserOutlined;
}

const ICON_TYPE_ENUM: IconType = {
  UserOutlined,
  SettingOutlined,
  DatabaseOutlined,
};

const IconWrapper: FC<IconProps> = ({ type }) => {
  const Icon = ICON_TYPE_ENUM[type];
  if (Icon) {
    return <Icon />;
  }
  return null;
};

export default IconWrapper;
