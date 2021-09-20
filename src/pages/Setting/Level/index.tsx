import React, { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@/components/ProTable';
import { useFetch, useBoolean } from '@/hooks';
import { columns } from './constant';

const SettingLevel: FC = ({}) => {
  const [visible, toggle] = useBoolean(false);
  const [[list]] = useFetch({
    url: '/GameLeveConfig/GetGameLeveConfigList',
    method: 'POST',
  });

  const [, handleSubmit] = useFetch(
    {
      url: '/GameLeveConfig/AddGameLeveConfig',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess(result) {
        console.log(result);
      },
    },
  );

  return (
    <div>
      <Button type="primary" onClick={toggle}>
        新增关卡
      </Button>
      <ProTable align="center" columns={columns} dataSource={list} />
      <Modal visible={visible} title="新增关卡" onCancel={toggle}></Modal>
    </div>
  );
};

export default SettingLevel;
