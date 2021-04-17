/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:13
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-16 20:26:21
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
