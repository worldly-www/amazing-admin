import React, { FC, useMemo } from 'react';
import { Button } from 'antd';
import ProTable from '@/components/ProTable';
import { useFetch } from '@/hooks';
import { columns } from './constant';

const UserList: FC = ({}) => {
  const userColumns = useMemo(() => {
    return columns.concat([
      {
        title: '操作',
        width: 360,
        render(record: any) {
          const { ID } = record;
          return (
            <>
              <Button type="primary" size="small" style={{ marginRight: 8 }}>
                历史周数
              </Button>
              <Button size="small" style={{ marginRight: 8 }}>
                历史积分
              </Button>
              <Button size="small" style={{ marginRight: 8 }}>
                历史排名
              </Button>
              <Button size="small">历史奖励</Button>
            </>
          );
        },
      },
    ]);
  }, []);

  const [[list, loading], fetchList] = useFetch({
    url: '/GameUserScoreReport/GetUserDashBoard',
  });

  return (
    <div>
      <ProTable
        loading={loading}
        align="center"
        columns={userColumns}
        dataSource={list}
      />
    </div>
  );
};

export default UserList;
