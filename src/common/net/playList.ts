/*
 * @Author: REFUSE_C
 * @Date: 2021-04-27 22:38:10
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-30 18:24:24
 * @Description:
 */
import { get } from './request';

/**
 * @name:获取用户歌单
 * @param {*}
 * @Description:
 */
export const playlist = (params: { uid: number | string }) => {
  return get('/user/playlist', params);
};

/**
 * @name:精品歌单标签
 * @param {*}
 * @Description:
 */
export const playlistTags = () => {
  return get('/playlist/highquality/tags');
};

/**
 * @name:更新歌单
 * @param {*} id:歌单id
 * @param {*} name:歌单名字
 * @param {*} desc:歌单描述
 * @param {*} tags:歌单tag ,多个用 `;`隔开,只能用官方规定标签
 * @Description:
 */
export const updatePlaylist = (params: { id: number | string; name: string; desc: string; tags: string }) => {
  return get('/playlist/update', params);
};

/**
 * @name:更新歌单描述
 * @param {*} id:歌单id
 * @param {*} desc:歌单描述
 * @Description:
 */
export const updatePlaylistDesc = (params: { id: number | string; desc: string }) => {
  return get('/playlist/desc/update', params);
};

/**
 * @name:更新歌名字
 * @param {*} id:歌单id
 * @param {*} name:名字
 * @Description:
 */
export const updatePlaylistName = (params: { id: number | string; name: string }) => {
  return get('/playlist/name/update', params);
};

/**
 * @name:更新歌标签
 * @param {*} id:歌单id
 * @param {*} name:歌单标签
 * @Description:
 */
export const updatePlaylistTag = (params: { id: number | string; tags: string }) => {
  return get('/playlist/tags/update', params);
};

/**
 * @name:歌单封面上传
 * @param {*} id  歌单id
 * @param {*} imgSize  图片尺寸,默认为300
 * @param {*} imgX 水平裁剪偏移,方形图片可不传,默认为0
 * @param {*} imgY 垂直裁剪偏移,方形图片可不传,默认为0
 * @Description:
 */
export const updatePlaylistCover = (params: { id: number | string; imgSize: string; imgX: number; imgY: number }) => {
  return get('/playlist/cover/update', params);
};

/**
 * @name:调整歌曲顺序
 * @param {*} pid 歌单id
 * @param {*} ids 歌曲id列表
 * @Description:
 */
export const updatePlaylistOrder = (params: { pid: number | string; ids: any }) => {
  return get('/song/order/update', params);
};

/**
 * @name: 歌单分类
 * @param {*}
 * @Description:
 */
export const playlistCatlist = () => {
  return get('/playlist/catlist');
};

/**
 * @name: 热门歌单分类
 * @param {*}
 * @Description:
 */
export const playlistHot = () => {
  return get('/playlist/hot');
};

/**
 * @name: 歌单 ( 网友精选碟 )
 * @param {*} order 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param {*} cat  tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param {*} limit  取出歌单数量 , 默认为 50
 * @param {*} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @Description:
 */
export const playlistTop = (params: { order?: string; cat?: string; limit: number; offset: number }) => {
  return get('/top/playlist', params);
};

/**
 * @name: 精品歌单标签列表
 * @param {*}
 * @Description:
 */
export const highqualityTags = () => {
  return get('/playlist/highquality/tags');
};

/**
 * @name: 获取精品歌单
 * @param {*} cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * @param {*} limit: 取出歌单数量 , 默认为 20
 * @param {*} before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @Description:
 */
export const highqualityTop = (params: { cat?: string; limit?: number; before?: number | string }) => {
  return get('/top/playlist/highquality', params);
};

/**
 * @name: 相关歌单推荐
 * @param {*} id 歌单id
 * @Description:
 */
export const playlistRelated = (params: { id: number | string }) => {
  return get('/related/playlist', params);
};

/**
 * @name: 获取歌单详情
 * @param {*} id : 歌单 id
 * @param {*} s : 歌单最近的 s 个收藏者,默认为8
 * @Description:
 */
export const playlistDetail = (params: { id: number | string; s?: number }) => {
  return get('/playlist/detail', params);
};

/**
 * @name: 歌单详情动态
 * @param {*} id : 歌单 id
 * @Description:
 */
export const playlistDetailDynamic = (params: { id: number | string }) => {
  return get('/playlist/detail/dynamic', params);
};

/**
 * @name: 新建歌单
 * @param {*} name : 歌单名
 * @param {*} privacy : 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
 * @param {*} type : 歌单类型,默认'NORMAL',传 'VIDEO'则为视频歌单
 * @Description:
 */
export const playlistCreate = (params: { name: string; privacy?: number | string; type?: string }) => {
  return get('/playlist/create', params);
};

/**
 * @name: 删除歌单
 * @param {*} id : 歌单id,可多个,用逗号隔开
 * @Description:
 */
export const playlistDelete = (params: { id: number | string }) => {
  return get('/playlist/delete', params);
};

/**
 * @name: 收藏/取消收藏歌单
 * @param {*} t : 类型,1:收藏,2:取消收藏 id : 歌单 id
 * @Description:
 */
export const playlistSubscribe = (params: { t: number | string }) => {
  return get('/playlist/subscribe', params);
};

/**
 * @name: 歌单收藏者
 * @param {*} id : 歌单 id
 * @param {*} limit: 取出评论数量 , 默认为 20
 * @param {*} offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @Description:
 */
export const playlistSubscribers = (params: { id: number | string; limit: number; offset: number }) => {
  return get('/playlist/subscribers', params);
};

/**
 * @name: 对歌单添加或删除歌曲
 * @param {*} op: 从歌单增加单曲为 add, 删除为 del
 * @param {*} pid: 歌单 id tracks: 歌曲 id,可多个,用逗号隔开
 * @Description:
 */
export const playlistTracks = (params: { op: number | string; pid?: number | string }) => {
  return get('/playlist/tracks', params);
};

/**
 * @name: 歌单评论
 * @param {*} id: 歌单 id
 * @param {*} limit: 取出评论数量 , 默认为 20
 * @param {*} offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {*} before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 * @Description:
 */
export const playlistComment = (params: {
  id: number | string;
  limit: number;
  offset: number;
  before: number | string;
}) => {
  return get('/comment/playlist', params);
};

/**
 * @name:获取相似歌单
 * @param {*} id: 歌曲 id
 * @Description:
 */
export const playlistSimi = (params: { id: number | string }) => {
  return get('/simi/playlist', params);
};

/**
 * @name:获取每日推荐歌单
 * @param {*}
 * @Description:
 */
export const playlistRecommend = () => {
  return get('/recommend/resource');
};

/**
 * @name:推荐歌单
 * @param {*}
 * @Description:
 */
export const personalized = () => {
  return get('/personalized');
};
