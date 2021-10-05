import React, { FC, useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import { ProForm, ProTable } from '@/components';
import { useFetch, useBoolean } from '@/hooks';
import { dateToUnit, dateToMoment, pick } from '@/utils';
import { columns, rewardItems } from './constant';

const { useForm } = ProForm;

const RewardList: FC = ({}) => {
  const [form] = useForm();
  const [editId, setEditId] = useState('');
  const [visible, toggle] = useBoolean(false);

  const [[list, loading], fetchList] = useFetch({
    url: '/GameGiftConfig/GetGameGiftConfigList',
  });

  const [[, submitLoading], submitReward] = useFetch(
    {
      url: '/GameGiftConfig/AddGameGiftConfig',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess() {
        toggle(false);
      },
    },
  );

  const [[, editLoading], editReward] = useFetch(
    {
      url: '/GameGiftConfig/EditGameGiftConfig',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess() {
        setEditId('');
        toggle(false);
      },
    },
  );

  const [, deleteReward] = useFetch(
    {
      url: '/GameGiftConfig/DeleteGameGiftConfig',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess() {
        fetchList();
      },
    },
  );

  const rewardColumns = useMemo(() => {
    return columns.concat([
      {
        title: '操作',
        width: 160,
        render(record: any) {
          const { ID, StartTime, EndTime } = record;
          const handleEdit = () => {
            const values = pick(record, ['GiftName', 'GiftNumner']);
            values.date = dateToMoment([StartTime, EndTime]);
            toggle(true);
            setEditId(ID);
            form.setFieldsValue(values);
          };
          const handleDelete = () => {
            deleteReward({ ID });
          };
          return (
            <>
              <Button type="primary" size="small" onClick={handleEdit}>
                编辑
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                size="small"
                danger
                onClick={handleDelete}
              >
                删除
              </Button>
            </>
          );
        },
      },
    ]);
  }, [deleteReward, setEditId, toggle]);

  const handleSubmit = async () => {
    const { date = [], ...restValues } = await form.validateFields();
    [restValues.StartTime, restValues.EndTime] = dateToUnit(date);
    if (editId) {
      await editReward({
        ID: editId,
        ...restValues,
      });
    } else {
      await submitReward(restValues);
    }
    fetchList();
  };

  return (
    <div>
      <Button type="primary" onClick={toggle} style={{ marginBottom: 12 }}>
        新增配置
      </Button>
      <ProTable
        rowKey="ID"
        align="center"
        loading={loading}
        columns={rewardColumns}
        dataSource={list}
      />
      <Modal
        destroyOnClose
        visible={visible}
        title="新增配置"
        onCancel={toggle}
        onOk={handleSubmit}
        confirmLoading={submitLoading || editLoading}
      >
        <ProForm form={form} items={rewardItems} preserve={false} />
      </Modal>
    </div>
  );
};

export default RewardList;
