/*
 * @Author: REFUSE_C
 * @Date: 2021-05-16 20:55:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-18 06:59:03
 * @Description:
 */
import React from 'react';
import { initSong, initUserInfo } from '@utils/local';
export const initialState = { currentSong: initSong, userInfo: initUserInfo, playList: [] };
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
