/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 21:49:44
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-29 11:05:37
 * @Description:
 */
import { get } from './request';

/**
 * @name:手机号登录
 * @param {*} params
 * @Description:
 */
export const login = (params: { phone: string; password: string }) => get('/login/cellphone', params);

/**
 * @name:获取用户详情
 * @param {*} params
 * @Description:
 */
export const userDetail = (params: { uid: string }) => get('/user/detail', params);

/**
 * @name: 获取用户等级
 * @param {*}
 * @Description:
 */
export const userLevel = () => get('/user/level');
