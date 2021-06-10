/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 22:13:46
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-11 01:22:38
 * @Description:
 */
module.exports = {
  parser: '@typescript-eslint/parser', // 指定ESLint解析器
  extends: [
    'plugin:react/recommended', // 使用来自 @eslint-plugin-react 的推荐规则
    'plugin:@typescript-eslint/recommended', // 使用来自@typescript-eslint/eslint-plugin的推荐规则
    'prettier/@typescript-eslint', // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // 允许解析最新的 ECMAScript 特性
    sourceType: 'module', // 允许使用 import
    ecmaFeatures: {
      jsx: true, // 允许对JSX进行解析
    },
  },
  rules: {
    indent: [2, 4],
    'no-console': 0, //禁止使用console
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, //函数参数不能重复
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-multi-spaces': 1, //不能用多余的空格

    // 自定义规则
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: {
    react: {
      version: 'detect', // 告诉 eslint-plugin-react 自动检测 React 的版本
    },
  },
};
