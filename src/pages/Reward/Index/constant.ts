import moment from 'moment';
import { objectToArray, dateToUnit } from '@/utils';

export const columns = objectToArray(
  {
    ID: {
      title: 'ID',
      width: 340,
    },
    GiftName: '奖励名称',
    GiftNumner: '奖励总数',
    StartTime: {
      title: '有效期',
      render: (value: string, { EndTime }: any) => {
        if (value) {
          return (dateToUnit([value, EndTime]) as Array<string>).join('~');
        }
        return '';
      },
    },
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);

export const rewardItems = objectToArray(
  {
    GiftName: {
      label: '奖励名称',
    },
    GiftNumner: {
      label: '奖励总数',
      type: 'InputNumber',
    },
    date: {
      label: '有效期',
      type: 'RangePicker',
    },
  },
  {
    labelKey: 'name',
  },
);
