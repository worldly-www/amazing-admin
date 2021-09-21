import { objectToArray } from '@/utils';

export const columns = objectToArray(
  {
    'Key.WalletId': {
      dataIndex: ['Key', 'WalletId'],
      title: '钱包地址',
    },
    'Key.WeekNumber': {
      dataIndex: ['Key', 'WeekNumber'],
      title: '当前周数',
    },
    SumScore: '当前积分',
    Rank: '当前排名',
    e: '描述',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);
