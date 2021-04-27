/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 21:49:44
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-27 20:56:28
 * @Description:
 */
import { get } from './request';

/**
 * @name:手机号登录
 * @param {*} params
 * @Description:
 */
export const login = (params: { phone: string; password: string }) => {
  return get('/login/cellphone', params);
};

/**
 * @name:获取用户详情
 * @param {*} params
 * @Description:
 */
export const userDetail = (params: { uid: string }) => {
  return get('/user/detail', params);
};

/**
 * @name: 获取用户等级
 * @param {*}
 * @Description:
 */
export const userLevel = () => {
  return get('/user/level');
};
