import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

const outputPath = 'dist/';
const env = process.env.NODE_ENV;
const publicPath = env === 'development' ? 'http://127.0.0.1:8000/' : outputPath;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: false,
  locale: {
    default: 'zh-CN',
  },
  define: {
    THEME: "zerocmf",
    VERSION: "0.0.1",
  },
  routes,
  fastRefresh: {},
  ssr: {
    devServerRender: false,
  },
  dva: {
    immer: true,
    hmr: false,
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  outputPath,
  publicPath,
  webpack5: {},
});
