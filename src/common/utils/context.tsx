/*
 * @Author: REFUSE_C
 * @Date: 2021-05-16 20:55:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-24 22:06:57
 * @Description:
 */
/*
showModal:
  showColor;// 显示颜色选择
  showPlayListTag; // 显示歌单tag
  showVideTag; // 显示视频tag
  showMvTag; // 显示MV tag
  showLogin；// 显示登录
  showPlayList；// 显示播放列表
*/
import React from 'react';
import { getLocal } from '@/common/utils/tools';
import { initSong, initUserInfo } from '@utils/local';
export const initialState = {
  isPlay: false, // 是否播放
  searchText: '', // 检索的文字
  isOnLine: true, // 当前的网络状态 true/已连接  false/已断开
  likeList: [], // 我喜欢的音乐id集合
  songList: [], // 当前播放的音乐列表
  playList: [], // 当前用户创建/收藏的歌单
  showModal: '', // 显示弹窗
  currentSong: initSong, // 当前播放的音乐信息
  userInfo: initUserInfo, // 用户信息
  globalColor: getLocal('color') || '#EC4141', // 当前主题颜色
};
export const reducer = (state: any, action: { type: string; data: any }) => {
  const { type, data } = action;
  return Object.assign({}, state, { [type]: data });
};
export const Context = React.createContext({}) as any;
