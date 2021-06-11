/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:49:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-11 10:34:57
 * @Description:
 */
import { get } from './request';

export const find = () => {
  return get('/homepage/block/page', '');
};

export const findBanner = (params?: any) => {
  return get('/banner', params);
};

/**
 * @name:获取每日推荐歌曲
 * @param {*} params
 * @Description:
 */
export const recommendSong = (params?: any) => {
  return get('/recommend/songs', params);
};

/**
 * @name:获取历史日推可用日期列表
 * @param {*} params
 * @Description:
 */
export const historyRecommendSong = (params?: any) => {
  return get('/history/recommend/songs', params);
};

/**
 * @name:获取历史日推详情数据
 * @param {*} params
 * @Description:
 */
export const historyRecommendSongDetail = (params: { date: string }) => {
  return get('/history/recommend/songs/detail', params);
};
/**
 * @name: 获取每日推荐歌单
 * @param {*} params
 * @Description:
 */
export const recommendList = (params?: any) => {
  return get('/recommend/resource', params);
};

/**
 * @name: 独家放送入口列表
 * @param {any} params
 * @Description:
 */
export const exclusive = (params?: any) => {
  return get('/personalized/privatecontent', params);
};

/**
 * @name: 推荐MV
 * @param {any} params
 * @Description:
 */
export const personalizedMv = (params?: any) => {
  return get('/personalized/mv', params);
};

/**
 * @name: 推荐电台
 * @param {any} params
 * @Description:
 */
export const recommendDj = () => {
  return get('/dj/personalize/recommend');
};
