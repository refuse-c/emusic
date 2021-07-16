/*
 * @Author: REFUSE_C
 * @Date: 2021-04-16 23:45:51
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-10 17:30:27
 * @Description:
 */
import { get } from './request';

/**
 * @name: 独家放送
 * @param {any} params
 * @Description:
 */
export const privatecontentList = (params?: any) => {
  return get('/personalized/privatecontent/list', params);
};
/**
 * @name: 最新音乐
 * @param {any} params
 * @Description:
 */
export const newMusic = (params?: any) => {
  return get('/top/song', params);
};

/**
 * @name: 喜欢的音乐
 * @param {object} params
 * @Description:
 */
export const addLike = (params: { id: number; like: boolean }) => {
  return get('/like', params);
};

/**
 * @name: 喜欢的音乐列表id
 * @param {any} params
 * @Description:
 */
export const likelist = () => {
  return get('/likelist');
};

/**
 * @name: 获取每首歌的详情
 * @param {*} params
 * @Description:
 */
export const songDetail = (params: { ids: string }) => {
  return get('song/detail', params);
};
/**
 * @name: 获取歌曲url
 * @param {*} params
 * @Description:
 * br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 */
export const songUrl = (params: { id: string | number; br?: string }) => {
  return get('song/url', params);
};

/**
 * @name: 获取歌词
 * @param {object} params
 * @Description:
 */
export const lyric = (params: { id: string | number }) => {
  return get('lyric', params);
};

/**
 * @name: 获取相似歌曲
 * @param {*}params
 * @Description:
 */

export const simiSong = (params: { id: number | string }) => {
  return get('/simi/song', params);
};

/**
 * @name: 分享歌曲、歌单、mv、电台、电台节目到动态
 * @param {string | number} id : 资源 id （歌曲，歌单，mv，电台，电台节目对应 id）
 * @param {string } type: 资源类型，默认歌曲 song，可传 song,playlist,mv,djradio,djprogram
 * @param {string | number} msg: 内容，140 字限制，支持 emoji，@用户名（/user/follows接口获取的用户名，用户名后和内容应该有空格），图片暂不支持
 * @Description:
 */
export const share = (params: { id: number | string; type: string; msg?: string }) => {
  return get('/share/resource', params);
};
