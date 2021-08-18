/*
 * @Author: REFUSE_C
 * @Date: 2021-04-07 23:41:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-18 23:53:44
 * @Description:
 */
import { FC, useEffect, useReducer, useCallback } from 'react';
import styles from './index.module.scss';
import Home from '@pages/home';
// import { login } from '@/common/net/login';
import { playlist } from '@/common/net/playList';
import { Context, reducer, initialState } from '@utils/context';
import { likelist, addLike, share } from '@/common/net/api';
import { message } from 'antd';
// import { growthpoint } from '@/common/net/vip';
import { isMe, jumpPage, setLocal } from '@/common/utils/tools';
import clone from 'clone';
import Login from '@components/model/login';
import copy from 'copy-to-clipboard';
import { growthpoint } from '@/common/net/vip';
import { loginStatus } from '@/common/net/login';
const createObj = { name: '创建的歌单', type: 2, isBold: false, isFull: false };
const collectObj = {
  name: '收藏的歌单',
  type: 2,
  isBold: false,
  isFull: false,
};
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

  // 检查登录状态
  const queryStatus = useCallback(async () => {
    const res: any = await loginStatus();
    console.log(res);
    const { profile: data } = res.data;
    if (data === null) return false;
    const userId = data.userId;
    const nickname = data.nickname || '';
    getLikeIds();
    getGrowthpoint();
    getPlaylist(userId, nickname);
    dispatch({ type: 'userInfo', data });
    dispatch({ type: 'showLogin', data: false });
    jumpPage('/find');
  }, []);

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
  const setLike = async (id: number, like: boolean, callback?: () => void) => {
    const res: any = await addLike({ id, like });
    if (res.code === 200) {
      getLikeIds();
      callback && callback();
      message.success(like ? '已添加到我喜欢的音乐' : '取消喜欢成功');
    } else {
      message.success(like ? '添加失败' : '取消失败');
    }
  };

  // 获取分享链接
  const handleShare = async (id: number | string, type: string) => {
    const res: any = await share({ id, type });
    const { code, message: msg } = res;
    code === 200
      ? res.resUrl && copy(res.resUrl) && message.success('分享链接已生成')
      : message.warning(msg);
  };

  // 获取当前登录用户的歌单
  const getPlaylist = async (uid: number, nickname: string) => {
    const res: any = await playlist({ uid });
    if (res.code === 200) {
      const allList = res.playlist || [];
      allList.map((item: Item) => {
        item.type = 1;
        item.path = `/single${item.id}/${'歌单'}`;
        item.name = isMe(item.userId, uid)
          ? item.name.replace(nickname, '我')
          : item.name;
        return item;
      });
      const createList = allList.filter(
        (item: Item) => item.privacy !== 10 && isMe(item.userId, uid)
      );
      const cloneList = clone(createList);
      const collectList = allList.filter(
        (item: Item) => item.privacy !== 10 && !isMe(item.userId, uid)
      );
      const myLikeId = allList.find(
        (item: any) => item.specialType === 5 && isMe(item.userId, uid)
      );
      createList.unshift(createObj);
      collectList.unshift(collectObj);
      const list = createList.concat(collectList);
      dispatch({ type: 'playList', data: list });
      dispatch({ type: 'createList', data: cloneList });
      dispatch({ type: 'myLikeId', data: String(myLikeId.id) });
    }
  };

  useEffect(() => {
    queryStatus();
  }, [queryStatus]);

  return (
    <div
      className={styles.app}
      onClick={() => dispatch({ type: 'showModal', data: '' })}
    >
      <Context.Provider
        value={{
          ...state,
          setLike,
          dispatch,
          getLikeIds,
          queryStatus,
          getPlaylist,
          handleShare,
          getGrowthpoint,
        }}
      >
        <Home />
        <Login
          hasShow={state.showLogin}
          onClose={() => dispatch({ type: 'showLogin', data: false })}
        />
      </Context.Provider>
    </div>
  );
};

export default App;
