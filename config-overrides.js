/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 13:25:20
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-19 21:10:56
 * @Description:
 */
const { override, addWebpackAlias, addDecoratorsLegacy, adjustStyleLoaders } = require('customize-cra');
const path = require('path');

module.exports = override(
  //按需加载antd

  //别名配置
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@common': path.resolve(__dirname, './src/common'),
    '@utils': path.resolve(__dirname, './src/common/utils'),
    '@images': path.resolve(__dirname, './src/common/images'),
    '@components': path.resolve(__dirname, './src/components'),
    '@pages': path.resolve(__dirname, './src/pages'),
  }),
  adjustStyleLoaders((rule) => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: './src/common/css/_variables.scss',
        },
      });
    }
  }),

  (config) => {
    // 为了方便使用 electron 以及 node.js 相关的 api
    // 需要将 target 设置为 electron-renderer
    // 设置了 target 之后，原生浏览器的环境将无法运行此 react 项目(因为不支持 node.js 相关的 api)，会抛出 Uncaught ReferenceError: require is not defined 异常
    // 需要在 electron 的环境才能运行(因为支持 node.js 相关的 api)
    // 这一步的操作, 都是为了能与 electron 进行更好的集成
    config.target = 'electron-renderer';
    return config;
  },
  addDecoratorsLegacy()
);
