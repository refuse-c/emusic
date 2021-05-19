/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:13
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-19 16:09:58
 * @Description:
 */

/**
 * @name:修改图片大小
 * @param {string} imgUrl 图片地址
 * @param {string} w      图片宽度
 * @param {string} h      图片高度
 */
export const formatImgSize = (imgUrl: string, w: number, h: number) => {
  return `${imgUrl}?param=${w}y${h}`;
};

/**
 * @name: 数字转换并添加单位
 * @param {number} val
 * @Description:
 */
export const formatNumber = (val: number) => {
  return val
    ? val > 100000000
      ? `${Math.floor(val / 100000000)}亿`
      : val > 100000
      ? `${Math.floor(val / 10000)}万`
      : val
    : 0;
};
/**
 * @name: 格式化歌曲时间
 * @param {*} v
 * @param {*} isSeconds
 * @Description:
 */
export const formatTime = (v: any, isSeconds: boolean = false) => {
  if (!v) return '00:00';
  const time = isSeconds ? v : Math.floor(v / 1000);
  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);
  const mm = m < 10 ? '0' + m : m;
  const ss = s < 10 ? '0' + s : s;
  return `${mm}:${ss}`;
};

/**
 * @name:格式化序号
 * @param {number} v
 */
export const formatSerialNumber = (v: number) => {
  if (v < 0) return '';
  return v < 10 ? '0' + v : v;
};
