/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:49:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-08 11:19:16
 * @Description:排行榜
 */
import { get } from './request';

/**
 * @name: 所有榜单
 * @param {any} params
 * @Description:
 */
export const toplist = (params?: {}) => {
  return get('/toplist', params);
};

/**
 * @name: 所有榜单摘要
 * @param {any} params
 * @Description:
 */
export const toplistDetail = (params?: {}) => {
  return get('/toplist/detail', params);
};

/**
 * @name: 歌手榜
 * @param {any} params
 * @Description:
 */
export const toplistArtist = (params?: { limit: number; area: string; offset: number }) => {
  return get('/toplist/artist', params);
};

/**
 * @name: mv排行榜
 * @param {any} params
 * @Description:
 *limit: 取出数量 , 默认为 30
 *area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
 *offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export const topMv = (params?: {}) => {
  return get('/top/mv', params);
};
