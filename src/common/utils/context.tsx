/*
 * @Author: REFUSE_C
 * @Date: 2021-05-16 20:55:54
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-16 20:56:02
 * @Description:
 */
import React from 'react';
import { initSong, initUserInfo } from '@utils/local';
const func = () => {};
const initData = {
  likeList: [],
  userInfo: { ...initUserInfo },
  playList: [],
  currentSong: { ...initSong },
  getLikeList: func,
  _dispatch: (_obj: any) => {},
};
export const Context = React.createContext({ ...initData });
