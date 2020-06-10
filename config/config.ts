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
        }
      ]
    },
  ],
});
