import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  base: '/admin',
  locale: {
    antd: true,
  },
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
    modules: false,
  },
  proxy: {
    '/api': {
      target: 'http://122.10.97.40:8088',
      changeOrigin: true,
    },
  },
  routes,
});
