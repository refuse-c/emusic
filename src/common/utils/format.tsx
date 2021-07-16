/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:13
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-07 11:16:51
 * @Description:
 */

import { message } from 'antd';

/**
 * @name:修改图片大小
 * @param {string} imgUrl 图片地址
 * @param {string} w      图片宽度
 * @param {string} h      图片高度
 */
export const formatImgSize = (imgUrl: string, w?: number, h?: number) => {
  return imgUrl && `${imgUrl.replace('http:', 'https:')}?param=${w || 50}y${h || 50}`;
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

/**
 * @name: 筛选出可用的音乐
 * @param {any} arr 歌单列表
 * @param {boolean} msg  是否显示提示语
 * @Description:
 */
export const formatAvailableSongs = (arr: any, msg: boolean = true) => {
  let list = [];
  if (!arr.length) {
    msg && message.error('当前暂无可播放音乐');
    return list;
  }
  list = arr.filter((item: { st: number }) => item.st !== -200); // 筛选出没有版权的音乐
  list = list.filter((item: { fee: number }) => item.fee !== 4); // 筛选出需要付费的专辑
  if (!list.length) {
    msg && message.error('因合作方要求,该资源暂时下架>_<');
  }
  return list;
};
