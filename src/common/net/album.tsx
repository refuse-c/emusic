/*
 * @Author: REFUSE_C
 * @Date: 2021-07-09 23:28:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-04 22:03:54
 * @Description:
 */

import { get } from './request';

/**
 * @name: 获取专辑内容
 * @param {*}
 * @Description:
 */
export const album = (params: { id: number | string }) => get('/album', params);

/**
 * @name: 收藏专辑
 * @param {*}
 * @Description:
 */
export const albumSub = (params: { id: number | string; t: number | string }) =>
  get('/album/sub', params);

/**
 * @name: 专辑动态信息
 * @param {*}
 * @Description: 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
 */
export const albumDynamic = (params: { id: number | string }) =>
  get('/album/detail/dynamic', params);

/**
 * @name: 新碟上架
 * @param {limit}: 取出数量 , 默认为 50
 * @param {offset}: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @param {area}: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * @param {type} : new:全部 hot:热门,默认为 new
 * @param {year} : 年,默认本年
 * @param {month} : 月,默认本月
 */
export const topAblum = (params: {
  area?: string;
  limit?: number;
  offset?: number;
  year?: string;
  month?: string;
  type?: string;
}) => get('/top/album', params);

/**
 * @name: 全部新碟
 * @param {limit} : 返回数量 , 默认为 30
 * @param {offset} : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {area} : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 */
export const albumNew = (params: {
  area?: string;
  limit?: number;
  offset?: number;
}) => get('/album/new', params);
