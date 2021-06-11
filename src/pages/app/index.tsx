/*
 * @Author: REFUSE_C
 * @Date: 2021-04-07 23:41:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-12 00:13:41
 * @Description:
 */
import { FC, useEffect, useReducer } from 'react';
import styles from './index.module.scss';
import Home from '@pages/home';
import { login } from '@/common/net/login';
import { playlist } from '@/common/net/playList';
import { Context, reducer, initialState } from '@utils/context';
import { likelist, addLike } from '@/common/net/api';
import { message } from 'antd';
import { growthpoint } from '@/common/net/vip';
import { setLocal } from '@/common/utils/tools';
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

  // 登录
  const getLogin = async () => {
    login({ phone: '18008523529', password: 'wangyi123' }).then(
      (res: any) => {
        if (res.code === 200) {
          const userInfo = res.profile;
          const userId = userInfo.userId;
          const nickname = userInfo.nickname || '';
          getPlaylist(userId, nickname);
          getGrowthpoint();
          dispatch({ type: 'userInfo', data: userInfo });
        }
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // 获取vip成长值

  const getGrowthpoint = async () => {
    const res: any = await growthpoint();
    if (res.code === 200) {
      const data = {
        level: res.data.levelCard.level,
        redVipImageUrl: res.data.levelCard.redVipImageUrl,
        vipType: res.data.userLevel.vipType,
      };
      setLocal('vipInfo', data);
      dispatch({ type: 'vipInfo', data });
    }
  };

  // 获取我喜欢的音乐ids集合
  const getLikeIds = async () => {
    const res: any = await likelist();
    if (res.code === 200) {
      dispatch({ type: 'likeList', data: res.ids || [] });
    }
  };

  // 添加/取消我喜欢的音乐
  const setLike = async (id: number, like: boolean) => {
    const res: any = await addLike({ id, like });
    if (res.code === 200) {
      getLikeIds();
      message.success(like ? '已添加到我喜欢的音乐' : '取消喜欢成功');
    } else {
      message.success(like ? '添加失败' : '取消失败');
    }
  };

  // 获取当前登录用户的歌单
  const getPlaylist = (uid: number, nickname: string) => {
    playlist({ uid }).then(
      (res: any) => {
        const allList = res.playlist || [];
        allList.map((item: Item) => {
          item.type = 1;
          item.path = `/single${item.id}`;
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
      },
      (err) => console.log(err),
    );
  };

  useEffect(() => {
    getLogin();
    getLikeIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app} onClick={() => dispatch({ type: 'showModal', data: '' })}>
      <Context.Provider value={{ ...state, setLike, dispatch }}>
        <Home />
      </Context.Provider>
    </div>
  );
};

export default App;
