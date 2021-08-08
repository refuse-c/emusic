/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 22:14:24
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-04 16:45:38
 * @Description:
 */

module.exports = {
  // printWidth: 90, // 一行最多 100 字符
  useTabs: false, // 不使用缩进符，而使用空格
  tabWidth: 2, // 使用 2 个空格缩进
  tabSize: 2,
  useTabs: false, //使用空格代替tab缩进
  semi: true, // 行尾需要有分号
  singleQuote: true, // 使用单引号
  quoteProps: 'as-needed', // 对象的 key 仅在必要时用引号
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  trailingComma: 'es5', // 末尾不需要逗号 'es5'  none
  bracketSpacing: true, // 大括号内的首尾需要空格
  jsxBracketSameLine: false, // jsx 标签的反尖括号需要换行
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  rangeEnd: Infinity,
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: 'preserve', // 使用默认的折行标准
  htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行
  endOfLine: 'lf', // 换行符使用 lf 结尾是 \n \r \n\r auto
};
