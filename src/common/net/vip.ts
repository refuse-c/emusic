/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:49:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-03 17:16:54
 * @Description:
 */
import { get } from './request';

/**
 * @name: vip成长值
 * @param {*}
 */
export const growthpoint = () => {
  return get('/vip/growthpoint');
};

/**
 * @name: vip成长值获取记录
 * @param {*}
 */
export const growthpointDetails = (params: { limit: number; offset: number }) => {
  return get('/vip/growthpoint/details', params);
};

/**
 * @name: vip任务
 * @param {*}
 */
export const vipTasks = () => {
  return get('/vip/tasks');
};

/**
 * @name:领取vip成长值
 * @param {object} params
 * ids 通过/vip/tasks获取到的unGetIds
 */
export const growthValue = (params: { ids: number }) => {
  return get('/vip/growthpoint/get', params);
};
