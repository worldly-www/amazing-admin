import React, { FC, useState, useMemo, useCallback } from 'react';
import { Button, message, Modal } from 'antd';
import { ProForm, ProTable } from '@/components';
import { useFetch, useBoolean } from '@/hooks';
import { columns, items, levelItems } from './constant';

const { useForm } = ProForm;

const SettingLevel: FC = ({}) => {
  const [form] = useForm();
  const [state, setState] = useState<Record<string, any> | null>(null);
  const [visible, toggle] = useBoolean(false);

  const [[list, loading], fetchList] = useFetch({
    url: '/GameLeveConfig/GetGameLeveConfigList',
  });

  const [[, submitLoading], submitLevel] = useFetch(
    {
      url: '/GameLeveConfig/AddGameLeveConfig',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess() {
        toggle(false);
      },
    },
  );

  const [[, editLoading], editLevel] = useFetch(
    {
      url: '/GameLeveConfig/EditGameLeveConfig',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess() {
        setState(null);
        toggle(false);
      },
    },
  );

  const [, deleteLevel] = useFetch(
    {
      url: '/GameLeveConfig/DeleteGameLeveConfig',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess() {
        fetchList();
      },
    },
  );

  const levelColumns = useMemo(() => {
    return columns.concat([
      {
        title: '操作',
        width: 160,
        render(record: any) {
          const { ID } = record;
          const handleEdit = () => {
            setState(record);
            toggle(true);
          };
          const handleDelete = () => {
            deleteLevel({ ID }).then(() => {
              message.success('删除成功');
            });
          };
          return (
            <>
              <Button type="primary" size="small" onClick={handleEdit}>
                编辑
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                size="small"
                onClick={handleDelete}
                danger
              >
                删除
              </Button>
            </>
          );
        },
      },
    ]);
  }, [setState, toggle, deleteLevel]);

  const handleSubmit = useCallback(async () => {
    const values = await form.validateFields();
    if (state) {
      await editLevel({
        ID: state.ID,
        ...values,
      });
    } else {
      await submitLevel(values);
    }
    fetchList();
  }, [form, state, fetchList, editLevel, submitLevel]);

  const handleCancel = useCallback(() => {
    toggle(false);
    setState(null);
    form.resetFields();
  }, [toggle]);

  return (
    <div>
      <ProForm items={items} layout="inline" onFinish={fetchList}>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </ProForm>
      <Button type="primary" onClick={toggle} style={{ margin: '12px 0' }}>
        新增关卡
      </Button>
      <ProTable
        rowKey="ID"
        loading={loading}
        align="center"
        columns={levelColumns}
        dataSource={list}
      />
      <Modal
        destroyOnClose
        visible={visible}
        title="新增关卡"
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={submitLoading || editLoading}
      >
        <ProForm form={form} items={levelItems} initialValues={state || {}} />
      </Modal>
    </div>
  );
};

export default SettingLevel;
