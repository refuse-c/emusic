/*
 * @Author: REFUSE_C
 * @Date: 2021-07-09 23:28:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 23:51:40
 * @Description:
 */

import { get } from './request';

/**
 * @name: 获取专辑内容
 * @param {*}
 * @Description:
 */
export const album = (params: { id: number | string }) => {
  return get('/album', params);
};

/**
 * @name: 收藏专辑
 * @param {*}
 * @Description:
 */
export const albumSub = (params: { id: number | string; t: number | string }) => {
  return get('/album/sub', params);
};
/**
 * @name: 专辑动态信息
 * @param {*}
 * @Description: 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
 */
export const albumDynamic = (params: { id: number | string }) => {
  return get('/album/detail/dynamic', params);
};
