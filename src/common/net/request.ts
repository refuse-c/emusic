/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:24:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-12 00:29:34
 * @Description:
 */

import { message } from 'antd';
import axios from 'axios';
// 新创建一个axios实例，并进行基础配置
const instance = axios.create({
  // baseURL: 'http://tshy.xyz:3000/',
  // baseURL: 'http://47.110.230.41:3000/',
  baseURL: 'https://refusec.xyz:3000/',
  timeout: 15000,
  withCredentials: true,
  // headers: {'X-Requested-With': 'XMLHttpRequest'}
});

// 添加请求拦截器
// instance.interceptors.request.use((config) => {
//   return config;
// });

// 添加xi响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      if (res.data.code !== 200) {
        const { msg } = res.data;
        if (msg) message.error(msg);
      }
      return Promise.resolve(res.data);
    }
    return res.data;
  },
  (err) => {
    const errMsg = JSON.parse(JSON.stringify(err));
    if (err && err.response && err.response.data && err.response.data.msg) {
      message.warning(err.response.data.msg);
    } else {
      message.warning(errMsg.message);
    }
    return Promise.resolve(err);
  },
);

/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
export const get = (url: string, params: any = {}) => {
  params.timestamp = new Date().getTime();
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
export const post = (url: string, params: any = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, { params })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
