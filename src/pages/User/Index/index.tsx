import React, { FC, useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@/components/ProTable';
import { useFetch, useBoolean } from '@/hooks';
import Content from './Content';
import { columns, ACTION_TYPE, ACTION_OPTION, ACTION_TEXT } from './constant';

const UserList: FC = ({}) => {
  const [state, setState] = useState({});
  const [visible, toggle] = useBoolean();
  const userColumns = useMemo(() => {
    return columns.concat([
      {
        title: '操作',
        width: 360,
        render(record: any) {
          const {
            Key: { WalletId },
          } = record;
          const handleClick = (type: ACTION_TYPE) => {
            const actionOption = Object.assign(
              {
                type,
              },
              ACTION_OPTION[type],
            );
            actionOption.service += '?strWallet=' + WalletId;
            if (ACTION_TYPE.WEEK === type) {
              actionOption.formatResult = ({ data }) =>
                data.yearWeek.map(WeekNumber => ({
                  WalletId,
                  WeekNumber,
                }));
            }
            if (ACTION_TYPE.SCORE === type) {
              actionOption.formatResult = ({ data }) =>
                data.map(item => ({
                  ...item,
                  WalletId,
                }));
            }
            if (ACTION_TYPE.RANK === type) {
              actionOption.formatResult = ({ data }) =>
                data.map(item => ({
                  ...item,
                  WalletId,
                }));
            }
            setState(actionOption);
            toggle(true);
          };
          return (
            <>
              <Button
                type="primary"
                size="small"
                style={{ marginRight: 8 }}
                onClick={() => handleClick(ACTION_TYPE.WEEK)}
              >
                历史周数
              </Button>
              <Button
                size="small"
                style={{ marginRight: 8 }}
                onClick={() => handleClick(ACTION_TYPE.SCORE)}
              >
                历史积分
              </Button>
              <Button
                size="small"
                style={{ marginRight: 8 }}
                onClick={() => handleClick(ACTION_TYPE.RANK)}
              >
                历史排名
              </Button>
              <Button
                size="small"
                onClick={() => handleClick(ACTION_TYPE.REWARD)}
              >
                历史奖励
              </Button>
            </>
          );
        },
      },
    ]);
  }, [toggle]);

  const [[list, loading]] = useFetch({
    url: '/GameUserScoreReport/GetUserDashBoard',
  });

  return (
    <div>
      <ProTable
        rowKey="ID"
        loading={loading}
        align="center"
        columns={userColumns}
        dataSource={list}
      />
      <Modal
        title={ACTION_TEXT[state.type]}
        destroyOnClose
        visible={visible}
        onCancel={toggle}
        footer={null}
      >
        <Content {...state} />
      </Modal>
    </div>
  );
};

export default UserList;
