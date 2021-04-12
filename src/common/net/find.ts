/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:49:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-12 21:28:17
 * @Description:
 */
import { get } from './request';

export const find = () => {
  return get('/homepage/block/page', '');
};

/**
 * @name:获取每日推荐歌曲
 * @param {*} params
 * @Description:
 */
export const recommendSong = (params) => {
  return get('/recommend/songs', params);
};

/**
 * @name: 获取每日推荐歌单
 * @param {*} params
 * @Description:
 */
export const recommendList = (params) => {
  return get('/recommend/resource', params);
};
