/*
 * @Author: REFUSE_C
 * @Date: 2021-05-16 20:55:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-18 16:26:12
 * @Description:
 */
/*
showModal:
  showColor: // 显示颜色选择
  showPlayListTag: // 显示歌单tag
  showVideTag: // 显示视频tag
  showMvTag: // 显示MV tag
  showLogin: // 显示登录
  showPlayList: // 显示播放列表
  showCatList: // 显示catlist
*/
import React from 'react';
import { getLocal } from '@/common/utils/tools';
import { INIT_SEARCH_INFO, INIT_SONG, INI_TUSER_INFO } from '@/common/utils/constant';
export const initialState = {
  isPlay: false, // 是否播放
  searchText: '', // 检索的文字
  searchInfo: INIT_SEARCH_INFO, // 检索到的总数量
  // isOnLine: true, // 当前的网络状态 true/已连接  false/已断开
  likeList: [], // 我喜欢的音乐id集合
  songList: [], // 当前播放的音乐列表
  playList: [], // 当前用户创建/收藏的歌单
  createList: [], // 当前用户创建的歌单
  myLikeId: '', // 我喜欢的音乐
  showModal: '', // 显示弹窗
  showPlayer: false, // 显示播放页
  vipInfo: getLocal('vipInfo') || { redVipImageUrl: '', level: 0, vipType: -1 }, // vip  信息
  currentSong: INIT_SONG, // 当前播放的音乐信息
  userInfo: INI_TUSER_INFO, // 用户信息
  globalColor: getLocal('color') || '#EC4141', // 当前主题颜色
  showLogin: false, // 是否显示登录
};
export const reducer = (state: any, action: { type: string; data: any }) => {
  const { type, data } = action;
  return Object.assign({}, state, { [type]: data });
};
export const Context = React.createContext({}) as any;
