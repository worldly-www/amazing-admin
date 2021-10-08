import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';
import ProTable from '@/components/ProTable';
import { useFetch } from '@/hooks';

interface IUserContentProps {
  walletId: string;
  service: string;
  columns: Array<any>;
  formatResult: (result: any) => any;
}

const UserContent: FC<IUserContentProps> = ({
  service,
  columns,
  formatResult,
}) => {
  const [[list, loading]] = useFetch(service, {
    formatResult,
  });

  console.log(list, 'list');

  return (
    <ProTable
      align="center"
      loading={loading}
      columns={columns}
      dataSource={list}
    />
  );
};

export default UserContent;
