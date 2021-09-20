import React, { FC, useMemo } from 'react';
import { Form } from 'antd';
import { FormProps, FormItemProps } from 'antd/es/form';
import { TableProps } from 'antd/es/table';

const FormItem = Form.Item;

interface IProFormProps extends FormProps {
  items: Array<FormItemProps>;
}

const ProForm: FC<IProFormProps> = () => {
  return <Form></Form>;
};

export default ProForm;
