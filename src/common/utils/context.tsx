/*
 * @Author: REFUSE_C
 * @Date: 2021-05-16 20:55:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-18 11:48:46
 * @Description:
 */
/*
modalStatus:
  showColor;// 显示颜色选择
  showPlayListTag; // 显示歌单tag
  showVideTag; // 显示视频tag
  showMvTag; // 显示MV tag
  showLogin；// 显示登录
*/
import React from 'react';
import { initSong, initUserInfo } from '@utils/local';
export const initialState = { currentSong: initSong, userInfo: initUserInfo, playList: [], modalStatus: '' };
export const reducer = (state: any, action: any) => {
  const { type, data } = action;
  switch (type) {
    case 'userInfo':
      return Object.assign({}, state, { userInfo: data });
    case 'playList':
      return Object.assign({}, state, { playList: data });
    case 'currentSong':
      return Object.assign({}, state, { currentSong: data });
    default:
      throw new Error();
  }
};
export const Context = React.createContext({}) as any;
