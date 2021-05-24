/*
 * @Author: REFUSE_C
 * @Date: 2021-04-28 21:28:23
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-24 23:25:43
 * @Description: 搜索接口
 */
import { get } from './request';

/**
 * @name:搜索
 * @param {*} keywords : 关键词
 * @param {*} limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {*} type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * @Description: 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接 /search 或者 /cloudsearch(更全)
 */
export const search = (params: { keywords: string; limit?: number; type: number | string }) => {
  return get('/search', params);
};

/**
 * @name: 默认搜索关键词
 * @param {*}
 * @Description:
 */
export const searchDefault = () => {
  return get('/search/default');
};

/**
 * @name: 热搜列表(简略)
 * @param {*}
 * @Description:
 */
export const searchHot = () => {
  return get('/search/hot');
};

/**
 * @name: 热搜列表(详情)
 * @param {*}
 * @Description:
 */
export const searchHotDetail = () => {
  return get('/search/hot/detail');
};

/**
 * @name: 搜索建议
 * @param {*} keywords : 关键词
 * @param {*} type : 如果传 'mobile' 则返回移动端数据
 * @Description:
 */
export const searchHotSuggest = (params: { keywords: string; type?: string }) => {
  return get('/search/suggest', params);
};

/**
 * @name: 搜索多重匹配
 * @param {*} keywords : 关键词
 * @Description:
 */
export const searchHotMultimatch = (params: { keywords: string }) => {
  return get('/search/multimatch', params);
};
