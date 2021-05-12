/*
 * @Author: REFUSE_C
 * @Date: 2021-04-07 23:41:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-12 23:47:41
 * @Description:
 */
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import Home from '@pages/home';
import { MyContext } from './context/context';
import { likelist } from '@/common/net/api';
import { login } from '@/common/net/login';
import { initUserInfo } from '@utils/local';
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
const App: FC = () => {
  const [likeList, setLikeList] = useState([]);
  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [playList, setPlayList] = useState([]);
  // 登录
  const getLogin = async () => {
    const res: any = await login({ phone: '13272946536', password: 'wangyi123@@' });
    const userInfo = res.profile;
    setUserInfo(userInfo);
    const userId = userInfo.userId;
    const nickname = userInfo.nickname || '';
    getPlaylist(userId, nickname);
  };
  // 获取我喜欢的音乐的ids
  const getLikeList = async () => {
    const res: any = await likelist();
    setLikeList(res.ids || []);
  };
  // 获取当前登录用户的歌单
  const getPlaylist = async (uid: number, nickname: string) => {
    const res: any = await playlist({ uid });
    const allList = res.playlist || [];
    allList.map((item: Item) => {
      item.type = 1;
      item.path = `/single${item.id}`;
      item.isFull = true;
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
    setPlayList(list);
  };

  useEffect(() => {
    getLogin();
    getLikeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <MyContext.Provider value={{ likeList, userInfo, playList, getLikeList }}>
        <Home />
      </MyContext.Provider>
    </div>
  );
};

export default App;
