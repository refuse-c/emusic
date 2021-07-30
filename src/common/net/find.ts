/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:49:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-29 11:05:26
 * @Description:
 */
import { get } from './request';

export const find = () => get('/homepage/block/page', '');

/**
 * @name:获取发现页面轮播图
 * @param {*} params
 * @Description:
 */
export const findBanner = (params?: any) => get('/banner', params);

/**
 * @name:获取每日推荐歌曲
 * @param {*} params
 * @Description:
 */
export const recommendSong = (params?: any) => get('/recommend/songs', params);

/**
 * @name:获取历史日推可用日期列表
 * @param {*} params
 * @Description:
 */
export const historyRecommendSong = (params?: any) => get('/history/recommend/songs', params);

/**
 * @name:获取历史日推详情数据
 * @param {*} params
 * @Description:
 */
export const historyRecommendSongDetail = (params: { date: string }) => get('/history/recommend/songs/detail', params);

/**
 * @name: 获取每日推荐歌单
 * @param {*} params
 * @Description:
 */
export const recommendList = (params?: any) => get('/recommend/resource', params);

/**
 * @name: 独家放送入口列表
 * @param {any} params
 * @Description:
 */
export const exclusive = (params?: any) => get('/personalized/privatecontent', params);

/**
 * @name: 推荐MV
 * @param {any} params
 * @Description:
 */
export const personalizedMv = (params?: any) => get('/personalized/mv', params);

/**
 * @name: 推荐电台
 * @param {any} params
 * @Description:
 */
export const recommendDj = () => get('/dj/personalize/recommend');
