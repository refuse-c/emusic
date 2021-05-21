/*
 * @Author: REFUSE_C
 * @Date: 2021-05-16 20:55:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-21 09:03:36
 * @Description:
 */
/*
showModal:
  showColor;// 显示颜色选择
  showPlayListTag; // 显示歌单tag
  showVideTag; // 显示视频tag
  showMvTag; // 显示MV tag
  showLogin；// 显示登录
*/
import React from 'react';
import { getLocal } from '@/common/utils/tools';
import { initSong, initUserInfo } from '@utils/local';
export const initialState = {
  isPlay: false, // 是否播放
  playList: [], // 当前用户创建/收藏的歌单
  showModal: '', // 显示弹窗
  songList: [], // 当前播放的音乐列表
  currentSong: initSong, // 当前播放的音乐信息
  userInfo: initUserInfo, // 用户信息
  globalColor: getLocal('color') || '#EC4141', // 当前主题颜色
};
export const reducer = (state: any, action: any) => {
  const { type, data } = action;
  switch (type) {
    case 'isPlay':
      return Object.assign({}, state, { [type]: data });
    case 'songList':
      return Object.assign({}, state, { [type]: data });
    case 'userInfo':
      return Object.assign({}, state, { [type]: data });
    case 'playList':
      return Object.assign({}, state, { [type]: data });
    case 'globalColor':
      return Object.assign({}, state, { [type]: data });
    case 'showModal':
      return Object.assign({}, state, { [type]: data });
    case 'currentSong':
      return Object.assign({}, state, { [type]: data });
    default:
      throw new Error();
  }
};
export const Context = React.createContext({}) as any;
