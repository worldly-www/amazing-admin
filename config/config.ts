import { defineConfig } from 'umi';

export default defineConfig({
  chainWebpack(memo) {
    memo.module.rule('images').test(/\.(png|jpe?g|gif|webp|ico|mp4)(\?.*)?$/);
  },
  dva: {
    immer: true,
    hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  cssLoader: {
    modules: false
  },
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          name: '工作台',
          path: 'home',
          component: './Home',
          routes: [
            {
              name: '我的',
              path: 'my',
              component: './Home'
            },
            {
              name: '我的1',
              path: 'my1',
              component: './Home'
            },
            {
              name: '我的2',
              path: 'my2',
              component: './Home'
            },
            {
              name: '我的3',
              path: 'my3',
              component: './Home'
            }
          ]
        },
        {
          name: '工作台1',
          path: 'home1',
          component: './Home',
          routes: [
            {
              name: '我的4',
              path: 'my4',
              component: './Home'
            },
            {
              name: '我的5',
              path: 'my5',
              component: './Home'
            },
            {
              name: '我的6',
              path: 'my6',
              component: './Home'
            },
            {
              name: '我的7',
              path: 'my7',
              component: './Home'
            }
          ]
        }
      ]
    },
  ],
});
