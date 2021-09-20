export default [
  {
    path: '/login',
    component: './Login',
  },
  {
    path: '/',
    component: '../layouts/Basic',
    routes: [
      {
        path: 'user',
        name: '用户数据管理',
        icon: 'UserOutlined',
        routes: [
          {
            path: 'index',
            name: '用户数据',
            icon: 'DatabaseOutlined',
            component: './User/Index',
          },
        ],
      },
      {
        name: '奖励设置',
        path: 'reward',
        icon: 'UserOutlined',
        routes: [
          {
            path: 'index',
            name: '每周奖励设置',
            component: './Reward/Index',
          },
        ],
      },
      {
        name: '参数设置',
        path: 'setting',
        icon: 'SettingOutlined',
        routes: [
          {
            path: 'level',
            name: '关卡设置',
            component: './Setting/Level',
          },
        ],
      },
    ],
  },
];
