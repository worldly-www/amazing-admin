import request from '@/utils/request';

export function fetchList() {
  return request.post('/GameLeveConfig/GetGameLeveConfigList');
}
