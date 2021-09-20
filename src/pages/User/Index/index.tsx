import React, { FC } from 'react';
import ProTable from '@/components/ProTable';
import { columns } from './constant';

const UserList: FC = ({}) => {
  return (
    <div>
      <ProTable align="center" columns={columns} />
    </div>
  );
};

export default UserList;
