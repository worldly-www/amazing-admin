import { objectToArray } from '@/utils';

export const columns = objectToArray(
  {
    a: '钱包地址',
    b: '当前周数',
    c: '当前积分',
    d: '当前排名',
    e: '描述',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);
