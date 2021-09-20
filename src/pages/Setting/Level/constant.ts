import { objectToArray } from '@/utils';

export const columns = objectToArray(
  {
    a: '关卡名称',
    b: '通关时间',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);
