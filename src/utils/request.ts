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

const codeMessage: Record<number, string> = {
  200: '成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '接口错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '接口超时。',
};

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
      return Promise.reject(error);
    }
    message.error(codeMessage[status]);
    return Promise.reject(error);
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
