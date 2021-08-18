/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:49:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-18 16:32:30
 * @Description:
 */
import { get } from './request';

export const find = () => get('/homepage/block/page', '');

/**
 * @name:获取发现页面轮播图
 * @param {*} params
 * @Description:
 */
export const findBanner = () => get('/banner');

/**
 * @name:获取每日推荐歌曲
 * @param {*} params
 * @Description:
 */
export const recommendSong = () => get('/recommend/songs');

/**
 * @name:获取历史日推可用日期列表
 * @param {*} params
 * @Description:
 */
export const historyRecommendSong = () => get('/history/recommend/songs');

/**
 * @name:获取历史日推详情数据
 * @param {*} params
 * @Description:
 */
export const historyRecommendSongDetail = (params: { date: string }) =>
  get('/history/recommend/songs/detail', params);

/**
 * @name: 获取每日推荐歌单
 * @param {*} params
 * @Description:
 */
// export const recommendList = () => get('/recommend/resource');
export const recommendList = () => get('/personalized');

/**
 * @name: 独家放送入口列表
 * @param {any} params
 * @Description:
 */
export const exclusive = () => get('/personalized/privatecontent');

/**
 * @name: 推荐MV
 * @param {any} params
 * @Description:
 */
export const personalizedMv = () => get('/personalized/mv');

/**
 * @name: 推荐电台
 * @param {any} params
 * @Description:
 */
export const recommendDj = () => get('/dj/personalize/recommend');
