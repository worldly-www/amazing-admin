import React, { FC } from 'react';
import { Form, Input, InputNumber, DatePicker } from 'antd';
import { FormItemProps } from 'antd/es/form';
import { pick } from '@/utils';

const FormItem = Form.Item;

const FORM_CONTROL_ENUM: Record<string, any> = {
  INPUT: Input,
  TEXTAREA: Input.TextArea,
  DATEPICKER: DatePicker,
  RANGEPICKER: DatePicker.RangePicker,
  INPUTNUMBER: InputNumber,
};

export interface IItemProps extends Omit<FormItemProps, 'children'> {
  type?: string;
}

const Item: FC<IItemProps> = ({ type = 'input', ...restProps }) => {
  const itemProps = pick(restProps, ['name', 'label', 'hidden']);
  const controlProps = pick(restProps, ['placeholder']);
  const Control = FORM_CONTROL_ENUM[type.toUpperCase()];
  return (
    <FormItem {...itemProps}>
      <Control {...controlProps} />
    </FormItem>
  );
};

export default Item;
