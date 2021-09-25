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

const WEEK_COLUMNS = objectToArray(
  {
    WalletId: '钱包地址',
    WeekNumber: '参与周数',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);

const SCORE_COLUMNS = objectToArray(
  {
    WalletId: '钱包地址',
    WeekNumber: {
      dataIndex: ['key', 'weekNumber'],
      title: '历史周数',
    },
    sumScore: '历史积分',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);

const RANK_COLUMNS = objectToArray(
  {
    WalletId: '钱包地址',
    weekNumber: '历史周数',
    rank: '历史排名',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);

const REWARD_COLUMNS = objectToArray(
  {
    WalletId: '钱包地址',
    WeekNumber: '历史周数',
    Rank: '奖励',
  },
  {
    labelKey: 'dataIndex',
    valueKey: 'title',
  },
);

export enum ACTION_TYPE {
  WEEK = 'week',
  SCORE = 'score',
  RANK = 'rank',
  REWARD = 'reward',
}

export const ACTION_OPTION = {
  [ACTION_TYPE.WEEK]: {
    service: '/GameUserScoreReport/GetCurrentUserHistoryWeek',
    columns: WEEK_COLUMNS,
  },
  [ACTION_TYPE.SCORE]: {
    service: '/GameUserScoreReport/GetCurrentUserWeekHistoryScore',
    columns: SCORE_COLUMNS,
  },
  [ACTION_TYPE.RANK]: {
    service: '/GameUserScoreReport/GetCurrentUserWeekHistoryScoreRankings',
    columns: RANK_COLUMNS,
  },
  [ACTION_TYPE.REWARD]: {
    service: '/GameUserScoreReport/GetCurrentUserWeekHistoryScoreGift',
    columns: REWARD_COLUMNS,
  },
};
