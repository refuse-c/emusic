/*
 * @Author: REFUSE_C
 * @Date: 2021-05-11 20:16:46
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-11 23:45:03
 * @Description:
 */
import React from 'react';
import { initUserInfo } from '@utils/local';
const func = () => {};
const initData = {
  likeList: [],
  userInfo: { ...initUserInfo },
  playList: [],
  getLikeList: func,
};
export const MyContext = React.createContext({ ...initData });
