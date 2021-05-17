/*
 * @Author: REFUSE_C
 * @Date: 2021-04-07 23:41:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-17 19:29:45
 * @Description:
 */
import { FC, useEffect, useReducer } from 'react';
import styles from './index.module.scss';
import Home from '@pages/home';
import { Context } from '@utils/context';
import { login } from '@/common/net/login';
import { initSong, initUserInfo } from '@utils/local';
import { playlist } from '@/common/net/playList';
const createObj = { name: '创建的歌单', type: 2, isBold: false, isFull: false };
const collectObj = { name: '收藏的歌单', type: 2, isBold: false, isFull: false };
interface Item {
  id: number;
  path: string;
  type: number;
  isFull: boolean;
  icon: string;
  privacy: number;
  userId: number;
  name: string;
}
const initialState = { currentSong: initSong, userInfo: initUserInfo, playList: [] };

function reducer(state: any, action: any) {
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
}
const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userInfo, playList, currentSong } = state;

  // 登录
  const getLogin = async () => {
    const res: any = await login({ phone: '13272946536', password: 'wangyi123@@' });
    const userInfo = res.profile;
    const userId = userInfo.userId;
    const nickname = userInfo.nickname || '';
    getPlaylist(userId, nickname);
    dispatch({ type: 'userInfo', data: userInfo });
  };

  // 获取当前登录用户的歌单
  const getPlaylist = async (uid: number, nickname: string) => {
    const res: any = await playlist({ uid });
    const allList = res.playlist || [];
    allList.map((item: Item) => {
      item.type = 1;
      item.path = `/single${item.id}`;
      item.icon = 'icon icon-menu-playlist';
      item.name = item.userId === uid ? item.name.replace(nickname, '我') : item.name;
      return item;
    });
    const createList = allList.filter((item: Item) => item.privacy !== 10 && item.userId === uid);
    const collectList = allList.filter((item: Item) => item.privacy !== 10 && item.userId !== uid);
    // const myLikeSingle = allList.find((item) => item.specialType === 5 && item.userId === uid);
    createList.unshift(createObj);
    collectList.unshift(collectObj);
    const list = createList.concat(collectList);
    dispatch({ type: 'playList', data: list });
  };

  useEffect(() => {
    getLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <Context.Provider value={{ userInfo, playList, currentSong, dispatch }}>
        <Home />
      </Context.Provider>
    </div>
  );
};

export default App;
