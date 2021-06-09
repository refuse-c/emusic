/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:24:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-09 23:58:46
 * @Description:
 */

import { message } from 'antd';
import axios from 'axios';

let isOnLine = true;
window.ononline = () => {
  isOnLine = navigator.onLine;
};
window.onoffline = () => {
  isOnLine = navigator.onLine;
};

// 新创建一个axios实例，并进行基础配置
const instance = axios.create({
  // baseURL: 'http://tshy.xyz:3000/',
  // baseURL: 'https://refusec.xyz:3000/'

  baseURL: 'http://47.110.230.41:3000/',

  timeout: 15000,
  withCredentials: true,
  // headers: {'X-Requested-With': 'XMLHttpRequest'}
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  return config;
});

// 添加xi响应拦截器
instance.interceptors.response.use(
  (response) => {
    //响应数据后做点什么
    return response.data;
  },
  (error) => {
    const err = JSON.parse(JSON.stringify(error));
    message.error(err.message);
    // 对响应错误做点什么
    return err; // Promise.reject(error);
  },
);

/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
export const get = (url: string, params: any | {} = {}) => {
  if (!isOnLine) return message.warning('当前网络不可用请检查');
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
export const post = (url: string, params: any | {} = {}) => {
  if (!isOnLine) return message.warning('当前网络不可用请检查');
  return new Promise((resolve, reject) => {
    instance
      .post(url, { params })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
