/*
 * @Author: REFUSE_C
 * @Date: 2021-07-08 16:14:44
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-02 18:23:36
 * @Description:用户详情页
 */

import { FC, useEffect, useState, useContext } from 'react';
import styles from './index.module.scss';
import Head from './component/head';
import Content from '@components/view/content';
import { Context } from '@utils/context';
import { follow, userDetail } from '@/common/net/api';
import { message } from 'antd';
import { playlist } from '@/common/net/playList';
import PlayList from '@/components/song-list';
import Arrange from '@/components/arrange';

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

const UserDetail: FC = (props: any) => {
  const { uid } = props.match.params;
  const [info, setInfo] = useState({});
  const [arrange1, setArrange1] = useState('row');
  const [arrange2, setArrange2] = useState('row');
  const [create, setCreate] = useState([]);
  const [collect, setCollect] = useState([]);
  const { userInfo } = useContext(Context);
  const { userId, nickname } = userInfo;
  const isMe = Number(uid) === userId;
  // 获取用户信息
  const getUserDetail = async (uid) => {
    const res: any = await userDetail({ uid });
    console.log(res);
    if (res.code === 200) setInfo(res);
  };

  // 关注/取消关注用户
  const getFollow = async (t) => {
    const res: any = await follow({ id: uid, t });
    if (res.code === 200) {
      getUserDetail(uid);
      message.success(t ? '关注成功' : '取消关注成功');
    }
  };

  // 获取当前登录用户的歌单
  const getPlaylist = async (uid: number, userId: string | number, nickname: string) => {
    const res: any = await playlist({ uid });
    if (res.code === 200) {
      const allList = res.playlist || [];
      allList.map((item: Item) => {
        item.type = 1;
        item.path = `/single${item.id}/${'歌单'}`;
        item.name = item.userId === userId ? item.name.replace(nickname, '我') : item.name;
        return item;
      });
      let createList = allList.filter((item: Item) => item.privacy !== 10 && item.userId === Number(uid));
      let collectList = allList.filter((item: Item) => item.privacy !== 10 && item.userId !== Number(uid));
      setCreate(createList);
      setCollect(collectList);
    }
  };

  useEffect(() => {
    getUserDetail(uid);
    getPlaylist(uid, userId, nickname);
  }, [uid, userId, nickname]);
  return (
    <div className={styles.userDetail}>
      <Content padding={'0 30px'} isFull>
        <Head data={info || {}} getFollow={getFollow} isMe={isMe} />
      </Content>
      {!!create.length && (
        <div className={styles.title}>
          <p>
            创建<span>{`（${create.length}）`}</span>
          </p>
          <Arrange active={arrange1} cb={setArrange1} />
        </div>
      )}
      <PlayList list={create} pad={true} layout={arrange1} />
      {!!collect.length && (
        <div className={styles.title}>
          <p>
            收藏<span>{`（${collect.length}）`}</span>
          </p>
          <Arrange active={arrange2} cb={setArrange2} />
        </div>
      )}
      <PlayList list={collect} pad={true} layout={arrange2} />
    </div>
  );
};

export default UserDetail;
