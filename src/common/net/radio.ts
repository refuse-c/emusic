/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:49:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-29 11:06:04
 * @Description:电台api
 */
import { get } from './request';

/**
 * @name: 电台轮播图
 * @param {any} params
 * @Description:
 */
export const radioBanner = (params?: any) => get('/dj/banner', params);
