/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:11:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-11 14:10:00
 * @Description:
 */
import { FC, useEffect, useState } from 'react';
import { Spin } from 'antd';
import Head from './component/head';
import styles from './index.module.scss';
import { songDetail } from '@/common/net/api';
import MusicList from '@components/musicList';
import Navigation from '@components/navigation';
import Comments from '@components/comments';
import Collectors from '@components/collectors';
import { playlistDetail } from '@/common/net/playList';
import { assemblyIds, mergeData } from '@/common/utils/tools';
import { navigationList } from '@/common/utils/local';

import Content from '@components/view/content';
const Single: FC = (props: any) => {
  const id = props.match.params.id;
  const [musicList, setMusicList] = useState<any>([]);
  const [headData, setHeadData] = useState({ coverImgUrl: '' });
  const [loading, setLoading] = useState(false);
  const [navStatus, setNavStatus] = useState(0);

  // 获取歌单内容
  const getPlayListDetail = async (id: string) => {
    setLoading(true);
    try {
      const res: any = await playlistDetail({ id });
      const headData = res.playlist || {};
      const idsArr = assemblyIds(res.playlist.trackIds);
      await getSongDetail(idsArr);
      setHeadData(headData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  // 批量获取歌曲详情
  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    const { songs, privileges } = res;
    const musicList = mergeData(songs, privileges); // 合并数据
    setMusicList(musicList);
  };
  useEffect(() => {
    setNavStatus(0);
    setMusicList([]);
    getPlayListDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Content isFull={true} padding={0}>
      <Spin spinning={loading}>
        <div className={styles.single}>
          <Content isFull={true} padding={'0 30px'}>
            <div id="head">
              <Head data={headData} list={musicList} />
              <Navigation
                status={navStatus}
                list={navigationList}
                onChange={(_item: any, index: number) => setNavStatus(index)}
              />
            </div>
          </Content>
          {navStatus === 0 ? (
            <MusicList list={musicList} likeCallBack={getPlayListDetail} />
          ) : navStatus === 1 ? (
            <Comments />
          ) : (
            <Collectors />
          )}
        </div>
      </Spin>
    </Content>
  );
};

export default Single;
