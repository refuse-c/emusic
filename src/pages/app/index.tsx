/*
 * @Author: REFUSE_C
 * @Date: 2021-04-07 23:41:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-19 16:12:24
 * @Description:
 */
import { FC, useEffect, useReducer } from 'react';
import styles from './index.module.scss';
import Home from '@pages/home';
import { login } from '@/common/net/login';
import { playlist } from '@/common/net/playList';
import { Context, reducer, initialState } from '@utils/context';
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

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isPlay, userInfo, playList, globalColor, showModal, currentSong } = state;

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
      // item.icon = 'icon icon-menu-playlist';
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
    <div className={styles.app} onClick={() => dispatch({ type: 'showModal', data: '' })}>
      <Context.Provider value={{ isPlay, userInfo, playList, globalColor, showModal, currentSong, dispatch }}>
        <Home />
      </Context.Provider>
    </div>
  );
};

export default App;
