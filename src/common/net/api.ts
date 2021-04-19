/*
 * @Author: REFUSE_C
 * @Date: 2021-04-16 23:45:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-19 23:14:17
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
  return get('top/song', params);
};
