import React, { FC } from 'react';
import ProTable from '@/components/ProTable';
import { columns } from './constant';

const RewardList: FC = ({}) => {
  return (
    <div>
      <ProTable align="center" columns={columns} />
    </div>
  );
};

export default RewardList;
