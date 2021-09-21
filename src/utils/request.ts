import { extend } from 'umi-request';
import { message } from 'antd';
import { history } from 'umi';

export interface IFetchResponse<T> {
  code: number;
  Code: number;
  Data: T;
  data: T;
  Message: string;
}

const request = extend({
  prefix: '/api',
  credentials: 'include',
  headers: {
    Accept: '*',
  },
  errorHandler(error) {
    const { status } = error.response;
    if (status === 401) {
      history.push('/login');
    }
    throw error;
  },
});

request.use(async (ctx, next) => {
  const { req } = ctx;
  const { headers } = req.options;
  const token = localStorage.getItem('token');
  Object.assign(headers, {
    Authorization: 'Bearer ' + token,
  });
  await next();
  const { res } = ctx;
  const { Code = 0, code = 0, Message } = res;
  if (Code !== 0 || code !== 0) {
    message.error(Message);
  }
});

export default request;
