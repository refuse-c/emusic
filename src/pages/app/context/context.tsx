/*
 * @Author: REFUSE_C
 * @Date: 2021-05-11 20:16:46
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-11 21:48:10
 * @Description:
 */
import React from 'react';
const func = () => {};
const initData = {
  likeList: [],
  userInfo: {},
  playList: [],
  getLikeList: func,
};
export const MyContext = React.createContext({ ...initData });
