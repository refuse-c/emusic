/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:49:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-29 11:07:04
 * @Description:
 */
import { get } from './request';

/**
 * @name: vip成长值
 * @param {*}
 */
export const growthpoint = () => get('/vip/growthpoint');

/**
 * @name: vip成长值获取记录
 * @param {*}
 */
export const growthpointDetails = (params: { limit: number; offset: number }) =>
  get('/vip/growthpoint/details', params);

/**
 * @name: vip任务
 * @param {*}
 */
export const vipTasks = () => get('/vip/tasks');

/**
 * @name:领取vip成长值
 * @param {object} params
 * ids 通过/vip/tasks获取到的unGetIds
 */
export const growthValue = (params: { ids: number }) => get('/vip/growthpoint/get', params);
