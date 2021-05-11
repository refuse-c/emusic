/*
 * @Author: REFUSE_C
 * @Date: 2021-04-16 23:45:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-11 20:02:55
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
 * @name: 喜欢的音乐列表id
 * @param {any} params
 * @Description:
 */
export const likelist = (params?: any) => {
  return get('/likelist', params);
};
