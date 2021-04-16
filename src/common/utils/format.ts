/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:13
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-16 17:46:34
 * @Description:
 */

/**
 * @name:修改图片大小
 * @param {string} imgUrl 图片地址
 * @param {string} w      图片宽度
 * @param {string} h      图片高度
 */
export const formatImgSize = (imgUrl: string, w: string, h: string) => {
  return `${imgUrl}?param=${w}y${h}`;
};
