/*
 * @Author: REFUSE_C
 * @Date: 2021-07-27 15:56:49
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-27 15:57:04
 * @Description:
 */

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
