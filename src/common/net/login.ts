/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 21:49:44
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-12 21:50:23
 * @Description:
 */
import { get } from './request';

/**
 * @name:手机号登录
 * @param {*} params
 * @Description:
 */
export const login = (params) => {
  return get('/login/cellphone', params);
};
