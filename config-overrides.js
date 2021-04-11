/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 13:25:20
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-11 14:36:54
 * @Description:
 */
const { override, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@common': path.resolve(__dirname, './src/common'),
    '@utils': path.resolve(__dirname, './src/common/utils'),
    '@images': path.resolve(__dirname, './src/common/images'),
    '@components': path.resolve(__dirname, './src/components'),
    '@pages': path.resolve(__dirname, './src/pages'),
  }),
  addDecoratorsLegacy(),
);
