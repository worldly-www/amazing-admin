import React, { FC } from 'react';
import { Form } from 'antd';
import { FormProps } from 'antd/es/form';
import Item, { IItemProps } from './Item';

const { useForm } = Form;
export interface IProFormProps extends FormProps {
  items: Array<IItemProps>;
}

type ProFormType = FC<IProFormProps> & {
  useForm: typeof useForm;
};

const ProForm: ProFormType = ({ items, children, ...restProps }) => {
  return (
    <Form {...restProps}>
      {items.map((item, index) => (
        <Item {...item} key={`${item.name}::${index}`} />
      ))}
      {children}
    </Form>
  );
};

ProForm.useForm = useForm;

export default ProForm;
