import React, { FC, ReactElement, useState, useCallback } from 'react';
import { Link, IRoute } from 'umi';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Avatar from './Avatar';
import './index.less';

const { Header } = Layout;

type GlobalHeaderProps = {
  onChange?: (collapsed: boolean) => void;
};

const GlobalHeader: FC<GlobalHeaderProps> = ({ onChange }) => {
  const [state, setState] = useState(false);
  const handleToggle = useCallback(() => {
    const collapsed = !state;
    setState(collapsed);
    if (onChange) {
      onChange(collapsed);
    }
  }, [state, onChange]);

  return (
    <Header className="global-header">
      {React.createElement(state ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: handleToggle,
      })}
      <div className="content">
        <Avatar />
      </div>
    </Header>
  );
};

export default GlobalHeader;
