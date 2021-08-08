/*
 * @Author: REFUSE_C
 * @Date: 2021-04-16 23:45:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-05 21:54:31
 * @Description:
 */
import { get } from './request';

/**
 * @name: 独家放送
 * @param {any} params
 * @Description:
 */
export const privatecontentList = (params?: any) =>
  get('/personalized/privatecontent/list', params);

/**
 * @name: 最新音乐
 * @param {any} params
 * @Description:
 */
export const newMusic = (params: { type: string }) => get('/top/song', params);

/**
 * @name: 喜欢的音乐
 * @param {object} params
 * @Description:
 */
export const addLike = (params: { id: number; like: boolean }) =>
  get('/like', params);

/**
 * @name: 喜欢的音乐列表id
 * @param {any} params
 * @Description:
 */
export const likelist = () => get('/likelist');

/**
 * @name: 获取每首歌的详情
 * @param {*} params
 * @Description:
 */
export const songDetail = (params: { ids: string }) =>
  get('song/detail', params);

/**
 * @name: 获取歌曲url
 * @param {*} params
 * @Description:
 * br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 */
export const songUrl = (params: { id: string | number; br?: string }) =>
  get('song/url', params);

/**
 * @name: 获取歌词
 * @param {object} params
 * @Description:
 */
export const lyric = (params: { id: string | number }) => get('lyric', params);

/**
 * @name: 获取相似歌曲
 * @param {*}params
 * @Description:
 */

export const simiSong = (params: { id: number | string }) =>
  get('/simi/song', params);

/**
 * @name: 分享歌曲、歌单、mv、电台、电台节目到动态
 * @param {string | number} id : 资源 id （歌曲，歌单，mv，电台，电台节目对应 id）
 * @param {string } type: 资源类型，默认歌曲 song，可传 song,playlist,mv,djradio,djprogram
 * @param {string | number} msg: 内容，140 字限制，支持 emoji，@用户名（/user/follows接口获取的用户名，用户名后和内容应该有空格），图片暂不支持
 * @Description:
 */
export const share = (params: {
  id: number | string;
  type: string;
  msg?: string;
}) => get('/share/resource', params);

/**
 * @name: 获取用户详情
 * @param {uid} string | number
 * @Description:需要登录
 */
export const userDetail = (params: { uid: number | string }) =>
  get('/user/detail', params);

/**
 * @name: 获取账号信息
 * @Description:需要登录
 */
export const userAccount = (params: {}) => get('/user/account', params);

/**
 * @name: 获取用户信息 , 歌单，收藏，mv, dj 数量
 * @Description:需要登录
 */
export const userSubcount = (params: {}) => get('/user/subcount', params);

/**
 * @name: 获取用户等级信息
 * @Description:需要登录
 */
export const userLevel = (params: {}) => get('/user/level', params);

/**
 * @name: 获取用户绑定信息
 * @param {uid} string | number
 * @Description:需要登录
 */
export const userBinding = (params: { uid: number | string }) =>
  get('/user/binding', params);

/**
 * @name:用户绑定手机
 * @param {*}
 * @Description:
 * phone : 手机号码
 * oldcaptcha: 原手机号码的验证码
 * captcha:新手机号码的验证码
 * countrycode: 国家地区代码,默认86
 *
 */
export const userReplacephone = (params: {
  phone: number;
  oldcaptcha: number;
  captcha: number;
  countrycode?: string;
}) => get('/user/replacephone', params);

/**
 * @name: 更新用户信息
 * @param {*}
 * @Description:
 * gender: 性别 0:保密 1:男性 2:女性
 * birthday: 出生日期,时间戳 unix timestamp
 * nickname: 用户昵称
 * province: 省份id
 * city: 城市id
 * signature：用户签名
 */
export const userUpdate = (params: {
  gender?: number | string;
  birthday?: string;
  nickname?: string;
  province?: number | string;
  city?: number | string;
  signature?: string;
}) => get('/user/update', params);

/**
 * @name: 获取用户电台
 * @param {uid} string | number
 * @Description:需要登录
 */
export const userDj = (params: { uid: number | string }) =>
  get('/user/dj', params);

/**
 * @name: 获取用户关注列表
 * @param {uid} string | number
 * @Description:需要登录
 */
export const userFollows = (params: {
  uid: number | string;
  limit?: number;
  offset?: number;
}) => get('/user/follows', params);

/**
 * @name: 获取用户粉丝列表
 * @param {uid} string | number
 * @Description:需要登录
 */
export const userFollowend = (params: {
  uid: number | string;
  limit?: number;
  offset?: number;
}) => get('/user/followeds', params);

/**
 * @name: 获取用户动态
 * @param {uid} string | number
 * @Description:需要登录
 */
export const userEvent = (params: {
  uid: number | string;
  limit?: number;
  lasttime?: number;
}) => get('/user/event', params);

/**
 * @name: 转发用户动态
 * @param {uid} string | number
 * @Description:需要登录
 * uid : 用户 id
 * evId : 动态 id
 * forwards : 转发的评论
 */
export const userForward = (params: {
  uid: number | string;
  evId?: number;
  forwards: string;
}) => get('/event/forward', params);

/**
 * @name: 删除用户动态
 * @param {uid} string | number
 * @Description:需要登录
 * evId : 动态 id
 */
export const eventDel = (params: { evId?: number }) =>
  get('/event/del', params);

/**
 * @name: 关注/取消关注用户
 * @param {uid} string | number
 * @Description: 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
 * id : 用户 id
 * t : 1为关注,其他为取消关注
 */
export const follow = (params: { id?: number | string; t: number }) =>
  get('/follow', params);

/**
 * @name: 分享歌曲、歌单、mv、电台、电台节目到动态
 * @param {id} 资源 id （歌曲，歌单，mv，电台，电台节目对应 id）
 * @param {type} 资源类型，默认歌曲 song，可传 song,playlist,mv,djradio,djprogram
 * @param {msg} 内容，140 字限制，支持 emoji，@用户名（/user/follows接口获取的用户名，用户名后和内容应该有空格），图片暂不支持
 * @Description: 登录后调用此接口 ,可以分享歌曲、歌单、mv、电台、电台节目到动态
 */
export const shareResource = (params: {
  id?: number | string;
  type: string;
  msg: string;
}) => get('/share/resource', params);

/**
 * @name: 获取用户播放记录
 * @param {uid}  用户 id
 * @param {type}  type=1 时只返回 weekData, type=0 时返回 allData
 * @Description: 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
 */
export const userRecord = (params: { uid: number | string; type?: number }) =>
  get('/user/record', params);

/**
 * @name: 获取最近 5 个听了这首歌的用户
 * @param {id}  歌曲 id
 * @Description: 调用此接口 , 传入歌曲 id, 最近 5 个听了这首歌的用户
 */
export const simiUser = (params: { id: number | string }) =>
  get('/simi/user', params);

/**
 * @name:国家编码列表
 * @param {object} params
 * @Description:
 */
export const countries = () => get('/countries/code/list');
