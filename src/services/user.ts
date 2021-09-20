import request from '@/utils/request';

interface LoginParams {
  UserName: string;
  UserPassword: string;
}

export function login(data: LoginParams) {
  return request
    .post('/GameEmployee/UserLogin', {
      data,
    })
    .then(result => {
      const { code, Token } = result;
      if (code === 0) {
        localStorage.setItem('token', Token);
      }
      return result;
    });
}
