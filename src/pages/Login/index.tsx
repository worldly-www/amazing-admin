import React, { FC, useCallback } from 'react';
import { IRouteComponentProps } from 'umi';
import { Form, Input, Button, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setRules } from '@/utils/validate';
import { login } from '@/services/user';
import './index.less';

const FormItem = Form.Item;
const Password = Input.Password;
const { Title } = Typography;

const Login: FC<IRouteComponentProps> = ({ history }) => {
  const handleSubmit = useCallback(values => {
    login(values).then(({ code }) => {
      if (code === 0) {
        history.replace('/');
        message.success('登录成功');
      }
    });
  }, []);

  return (
    <section className="login-container">
      <Form className="login-main" onFinish={handleSubmit}>
        <Title className="login__title" level={3}>
          用户登录
        </Title>
        <FormItem name="UserName" rules={setRules('用户名不能为空')}>
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </FormItem>
        <FormItem name="UserPassword" rules={setRules('请输入登录密码')}>
          <Password prefix={<LockOutlined />} placeholder="请输入登录密码" />
        </FormItem>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form>
    </section>
  );
};

export default Login;
