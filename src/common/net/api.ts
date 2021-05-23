/*
 * @Author: REFUSE_C
 * @Date: 2021-04-16 23:45:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-23 14:11:33
 * @Description:
 */
import { get } from './request';

/**
 * @name: 独家放送
 * @param {any} params
 * @Description:
 */
export const privatecontentList = (params?: any) => {
  return get('/personalized/privatecontent/list', params);
};
/**
 * @name: 最新音乐
 * @param {any} params
 * @Description:
 */
export const newMusic = (params?: any) => {
  return get('/top/song', params);
};

/**
 * @name: 喜欢的音乐
 * @param {object} params
 * @Description:
 */
export const addLike = (params: { id: number; like: boolean }) => {
  return get('/like', params);
};

/**
 * @name: 喜欢的音乐列表id
 * @param {any} params
 * @Description:
 */
export const likelist = () => {
  return get('/likelist');
};

/**
 * @name: 获取每首歌的详情
 * @param {*} params
 * @Description:
 */
export const songDetail = (params: { ids: string }) => {
  return get('song/detail', params);
};
/**
 * @name: 获取歌曲url
 * @param {*} params
 * @Description:
 * br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 */
export const songUrl = (params: { id: string | number; br?: string }) => {
  return get('song/url', params);
};
