import { objectToArray } from '@/utils';

export const columns = objectToArray(
  {
    a: '奖励名称',
    b: '奖励总数',
    c: '有效期',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);
