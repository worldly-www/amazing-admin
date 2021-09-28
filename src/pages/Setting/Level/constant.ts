import { objectToArray } from '@/utils';

export const items = objectToArray(
  {
    name: '关卡名称',
  },
  {
    labelKey: 'name',
    valueKey: 'label',
  },
);

export const columns = objectToArray(
  {
    Level: '关卡名称',
    GameTime: '通关时间',
    GamePastScore: '过关分数',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);

export const levelItems = objectToArray(
  {
    Level: {
      label: '关卡名称',
    },
    GameTime: {
      label: '通关时间',
    },
    GamePastScore: {
      label: '过关分数',
      type: 'inputnumber',
    },
  },
  {
    labelKey: 'name',
  },
);
