/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 21:49:44
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-18 15:44:18
 * @Description:
 */
import { get } from './request';

/**
 * @name:手机号登录
 * @param phone
 * @param password
 * @Description:
 */
export const login = (params: { phone: string; password: string }) =>
  get('/login/cellphone', params);

/**
 * @name: 邮箱登录
 * @param email
 * @param password
 * @Description:
 */
export const loginMail = (params: { email: string; password: string }) =>
  get('/login', params);

// 二维码登录
/**
 * @name: 二维码key生成接口
 * @Description:
 */
export const qrKey = () => get('/login/qr/key');

/**
 * @name: 二维码生成
 * @param key,由第一个接口生成
 * @param qrimg 传入后会额外返回二维码图片base64编码
 * @Description:
 */
export const qrCreate = (params: { key: string; qrimg?: boolean }) =>
  get('/login/qr/create', params);

/**
 * @name: 二维码检测扫码状态接口
 * @param key,由第一个接口生成
 * @Description:轮询此接口可获取二维码扫码状态,800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功(803状态码下会返回cookies)
 */
export const qrCheck = (params: { key: string }) =>
  get('/login/qr/check', params);

/**
 * @name: 刷新登录
 * @Description:
 */
export const refresh = () => get('/login/refresh');

/**
 * @name: 退出登录
 * @Description:
 */
export const logout = () => get('/logout');

/**
 * @name: 登录状态
 * @Description:
 */
export const loginStatus = () => get('/login/status');

/**
 * @name: 发送验证码
 * @param phone: 手机号码
 * @param ctcode: 国家区号,默认86即中国
 * @Description:
 */
export const sendMsg = (params: {
  phone: string | number;
  ctcode?: string | number;
}) => get('/captcha/sent', params);

/**
 * @name: 验证验证码
 * @param phone: 手机号码
 * @param captcha: 验证码
 * @param ctcode: 国家区号,默认86即中国
 * @Description:
 */
export const checkMsg = (params: {
  phone: string | number;
  captcha: string | number;
  ctcode?: string | number;
}) => get('/captcha/verify', params);

/**
 * @name: 注册(修改密码)
 * @param captcha: 验证码
 * @param phone : 手机号码
 * @param password: 密码
 * @param nickname: 昵称
 * @param countrycode: 国家码，用于国外手机号，例如美国传入：1 ,默认86即中国
 * @Description:
 */
export const register = (params: {
  captcha: string | number;
  phone: string | number;
  password: string | number;
  nickname: string | number;
  countrycode?: string | number;
}) => get('/register/cellphone', params);

/**
 * @name:检测手机号码是否已注册
 * @param phone : 手机号码
 * @param countrycode: 国家码，用于国外手机号，例如美国传入：1 ,默认86即中国
 * @Description:
 */
export const checkPhone = (params: {
  phone: string | number;
  countrycode?: string | number;
}) => get('/cellphone/existence/check', params);

/**
 * @name:初始化昵称
 * @param nickname : 昵称
 * @Description:
 */
export const initNickname = (params: { nickname: string }) =>
  get('/activate/init/profile', params);

/**
 * @name:更换绑定手机
 * @param oldcaptcha : 原手机验证码
 * @param captcha : 新手机验证码
 * @param phone : 手机号码
 * @param ctcode : 国家区号 默认86即中国
 * @Description:
 */
export const rebind = (params: {
  oldcaptcha: string;
  captcha: string;
  phone: string;
  ctcode: string;
}) => get('/rebind', params);

/**
 * @name:获取用户详情
 * @param uid: 用户id
 * @Description:
 */
export const userDetail = (params: { uid: string }) =>
  get('/user/detail', params);

/**
 * @name: 获取用户等级
 * @Description:
 */
export const userLevel = () => get('/user/level');
