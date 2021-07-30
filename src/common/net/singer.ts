/*
 * @Author: REFUSE_C
 * @Date: 2021-06-09 12:11:56
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-29 11:06:29
 * @Description:歌手api
 */
import { get } from './request';

interface Id {
  id: number | string;
}

/**
 * @name: 热门歌手
 * @param {object} params
 * limit: 取出数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
export const topArtists = (params: { limit: number; offset: number }) => get('/top/artists', params);

/**
 * @name: 歌手分类列表
 * @param {object} params
 * limit : 返回数量 , 默认为 30
 * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
 * initial 取值: A-Z
 * type 取值:-1:全部 1:男歌手2:女歌手3:乐队
 * area 取值:-1:全部 7:华语 96:欧美 8:日本 16:韩国 0:其他
 */
export const artistList = (params: { limit: number; offset: number; initial: string; type: string; area: string }) =>
  get('/artist/list', params);

/**
 * @name: 收藏取消歌手
 * @param {object} params
 * id : 歌手 id
 * t:操作,1 为收藏,其他为取消收藏
 */
export const artistSub = (params: { id: Id; t: number }) => get('/artist/sub', params);

/**
 * @name: 歌手热门50首歌曲
 * @param {object} params
 * id : 歌手 id
 */
export const artistTopSong = (params: { id: Id }) => get('/artist/top/song', params);

/**
 * @name: 歌手全部歌曲
 * @param {object} params
 * id : 歌手 id
 * order : hot ,time 按照热门或者时间排序
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export const artistSongs = (params: { id: Id; order?: string; limit: number; offset: number }) =>
  get('/artist/songs', params);

/**
 * @name: 收藏的歌手列表
 * @param {object} params
 */
export const artistSublist = (params: { id: Id; order?: string; limit: number; offset: number }) =>
  get('/artist/sublist', params);

/**
 * @name:获取歌手单曲
 * @param {*}
 * id: 歌手 id, 可由搜索接口获得
 */
export const artists = (params: { id: Id }) => get('/artists', params);

/**
 * @name:获取歌手Mv
 * @param {*}
 * id: 歌手 id, 可由搜索接口获得
 */
export const artistsMv = (params: { id: Id }) => get('/artist/mv', params);

/**
 * @name:获取歌手专辑
 * @param {*}
 * id: 歌手 id
 *  * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 */
export const artistsAlbum = (params: { id: Id; limit?: number; offset?: number }) => get('/artist/album', params);

/**
 * @name:获取歌手描述
 * @param {*}
 * id: 歌手 id
 */
export const artistsDesc = (params: { id: Id }) => get('/artist/desc', params);

/**
 * @name:获取歌手详情
 * @param {*}
 * id: 歌手 id
 */
export const artistsDetail = (params: { id: Id }) => get('/artist/detail', params);

/**
 * @name:获取相似歌手
 * @param {*}
 * id: 歌手 id
 */
export const artistsSimi = (params: { id: Id }) => get('/simi/artist', params);

/**
 * @name:热门歌手
 * @param {*}
 * id: 歌手 id
 */
export const artistsTop = (params: { id: Id }) => get('/top/artists', params);

/**
 * @name:歌手榜
 * @param {*}
 * id: 歌手 id
 * type : 地区1: 华语2: 欧美3: 韩国4: 日本
 */
export const artistsTopList = (params: { id: Id; type: number | string }) => get('/toplist/artist', params);

/**
 * @name:关注歌手新歌
 * @param {*}
 * limit: 取出评论数量 , 默认为 20
 * before: 上一页数据返回的publishTime的数据
 */
export const artistNewSong = (params: { limit: number; before: number | string }) => get('/artist/new/song', params);

/**
 * @name:关注歌手新MV
 * @param {*}
 * limit: 取出评论数量 , 默认为 20
 * before: 上一页数据返回的publishTime的数据
 */
export const artistNewMv = (params: { limit: number; before: number | string }) => get('/artist/new/mv', params);

/**
 * @name:关注歌手新MV
 * @param {*}
 * id : 歌手 id
 * limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*10, 其中 10 为 limit 的值
 */
export const artistFans = (params: { id: Id; limit: number; offset: number }) => get('/artist/fans', params);
