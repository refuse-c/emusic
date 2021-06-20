/*
 * @Author: REFUSE_C
 * @Date: 2021-06-15 11:24:32
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-18 10:16:39
 * @Description: video  mv api
 */
import { get } from './request';

/**
 * @name: 收藏视频
 * @param {object} params
 * id : 视频 id
 * t : 1 为收藏,其他为取消收藏
 */
export const subVideo = (params: { id: string | number; t: string | number }) => {
  return get('/video/sub', params);
};

/**
 * @name: 收藏视频到视频歌单
 * @param {object} params
 * pid : 歌单 id
 * ids : 视频id,支持多个,用,隔开
 */
export const playlistTrackAdd = (params: { pid: string | number; ids: string }) => {
  return get('/playlist/track/add', params);
};

/**
 * @name: 删除视频歌单里的视频
 * @param {object} params
 * pid : 歌单 id
 * ids : 视频id,支持多个,用,隔开
 */
export const playlistTrackDel = (params: { pid: string | number; ids: string }) => {
  return get('/playlist/track/delete', params);
};

/**
 * @name: 最近播放的视频
 * @param {object} params
 * pid : 歌单 id
 * ids : 视频id,支持多个,用,隔开
 */
export const playlistVideoRecent = (params: { pid: string | number; ids: string }) => {
  return get('/playlist/video/recent', params);
};

/**
 * @name:资源点赞( MV,电台,视频)
 * @param {*}
 * id: 资源 id
 * t: 操作,1 为点赞,其他未取消点赞
 * type 1: mv  4: 电台  5: 视频  6: 动态
 */
export const resourceLike = (params: { id: string | number; t: string; type: number }) => {
  return get('/resource/like', params);
};

/**
 * @name:获取点赞过的视频
 * @param {*}
 */
export const playlistMyLike = (params: { id: string | number; t: string; type: number }) => {
  return get('/playlist/mylike', params);
};

/**
 * @name: 全部 mv
 * @param {object} params
 * area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
export const mvAll = (params: { area?: string; type?: string; order?: string; limit?: number; offset?: number }) => {
  return get('/mv/all', params);
};

/**
 * @name:最新MV
 * @param {object} params
 * area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * limit: 取出数量 , 默认为 30
 */
export const mvFirst = (params: { area?: string; limit?: number }) => {
  return get('/mv/first', params);
};

/**
 * @name:网易出品mv
 * @param {object} params
 * limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export const mvExclusiveRcmd = (params: { limit?: number; offset?: number }) => {
  return get('/mv/exclusive/rcmd', params);
};

/**
 * @name:推荐MV
 * @param {object} params
 * limit: 取出数量 , 默认为 30
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export const mvPersonalized = (params: { limit?: number; offset?: number }) => {
  return get('/personalized/mv', params);
};

/**
 * @name: mv 排行
 * @param {object} params
 * limit: 取出数量 , 默认为 30
 * area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 */
export const topMv = (params: { limit?: string | number; area?: string; offset?: number }) => {
  return get('/top/mv', params);
};

/**
 * @name: 获取 mv 数据
 * @param {object} params
 * mvid: mv 的 id
 */
export const mvDetail = (params: { mvid?: string | number }) => {
  return get('/mv/detail', params);
};

/**
 * @name: 获取 mv 点赞转发评论数数据
 * @param {object} params
 * mvid: mv 的 id
 */
export const mvDetailInfo = (params: { mvid?: string | number }) => {
  return get('/mv/detail/info', params);
};

/**
 * @name:获取mv url地址
 * @param {object} params
 * id: mv id
 * r: 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表
 */
export const mvUrl = (params: { id?: string | number; t: number }) => {
  return get('/mv/url', params);
};

/**
 * @name: 获取视频标签列表
 * @param {object} params
 */
export const videoGroupTag = (params: {}) => {
  return get('/video/group/list', params);
};

/**
 * @name: 热门视频标签
 * @param {object} params
 */
export const videoCategoryTag = (params: {}) => {
  return get('/video/category/list', params);
};

/**
 * @name: 获取视频标签/分类下的视频
 * @param {object} params
 * id: videoGroup 的 id
 * offset: 默认0
 */
export const videoGroup = (params: { id: number | string; offset?: number }) => {
  return get('/video/group', params);
};

/**
 * @name: 获取全部视频列表
 * @param {object} params
 * offset: 默认0
 */
export const videoTimelineAll = (params: { offset?: number }) => {
  return get('/video/timeline/all', params);
};

/**
 * @name: 获取推荐视频
 * @param {object} params
 * offset: 默认0
 */
export const videoTimelineRecommend = (params: { offset?: number }) => {
  return get('/video/timeline/recommend', params);
};

/**
 * @name: 相关视频
 * @param {object} params
 * id: 视频 的 id
 */
export const relatedAllvideo = (params: { id: number | string }) => {
  return get('/related/allvideo', params);
};

/**
 * @name: 视频详情
 * @param {object} params
 * id: 视频 的 id
 */
export const videoDetail = (params: { id: number | string }) => {
  return get('/video/detail', params);
};

/**
 * @name: 获取视频点赞转发评论数数据
 * @param {object} params
 * id: 视频 的 id
 */
export const videoDetailInfo = (params: { id: number | string }) => {
  return get('/video/detail/info', params);
};

/**
 * @name: 获取视频播放地址
 * @param {object} params
 * @description 传入mlog id, 可获取video id，然后通过video/url 获取播放地址
 * id: 视频 的 id
 */
export const videoUrl = (params: { id: number | string }) => {
  return get('/video/url', params);
};

/**
 * @name: 将mlog id转为视频id
 * @param {object} params
 * id : mlog id
 */
export const mlogToVideo = (params: { id: number | string }) => {
  return get('/mlog/to/video', params);
};
