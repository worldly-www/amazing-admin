import { objectToArray } from '@/utils';

export const columns = objectToArray(
  {
    ID: 'ID',
    Key: '密钥',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);

export const items = objectToArray(
  {
    Key: '密钥',
  },
  {
    labelKey: 'name',
    valueKey: 'label',
  },
);
