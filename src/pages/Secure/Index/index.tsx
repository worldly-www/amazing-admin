import React, { FC, useState, useMemo, useCallback } from 'react';
import { Button, message, Modal } from 'antd';
import { ProForm, ProTable } from '@/components';
import { useFetch, useBoolean } from '@/hooks';
import { columns, items } from './constant';
import { pick } from '@/utils';

const { useForm } = ProForm;

const SettingLevel: FC = ({}) => {
  const [form] = useForm();
  const [editId, setEditId] = useState('');
  const [visible, toggle] = useBoolean(false);

  const [[list, loading], fetchList] = useFetch(
    {
      url: '/GameSignKeyConfig/GetSignKeyConfig',
    },
    {
      formatResult(result) {
        return [result.Data];
      },
    },
  );

  const [[, submitLoading], submitKey] = useFetch(
    {
      url: '/GameSignKeyConfig/AddSignKeyConfig',
      method: 'POST',
    },
    {
      manual: true,
      onSuccess() {
        toggle(false);
      },
    },
  );

  const [[, editLoading], editKey] = useFetch(
    {
      url: '/GameSignKeyConfig/EditSignKeyConfig',
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

  const levelColumns = useMemo(() => {
    return columns.concat([
      {
        title: '操作',
        width: 160,
        render(record: any) {
          const { ID } = record;
          const handleEdit = () => {
            const values = pick(record, ['Key']);
            toggle(true);
            setEditId(ID);
            form.setFieldsValue(values);
          };
          return (
            <>
              <Button type="primary" size="small" onClick={handleEdit}>
                修改
              </Button>
            </>
          );
        },
      },
    ]);
  }, [setEditId, toggle, form]);

  const handleSubmit = useCallback(async () => {
    const values = await form.validateFields();
    if (editId) {
      await editKey({
        ID: editId,
        ...values,
      });
    } else {
      await submitKey(values);
    }
    fetchList();
  }, [form, editId, fetchList, editKey, submitKey]);

  const handleCancel = useCallback(() => {
    setEditId('');
    toggle(false);
  }, [toggle]);

  return (
    <div>
      <Button type="primary" onClick={toggle} style={{ margin: '12px 0' }}>
        新增密钥
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
        <ProForm form={form} preserve={false} items={items} />
      </Modal>
    </div>
  );
};

export default SettingLevel;
