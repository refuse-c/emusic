/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:11:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-13 13:55:53
 * @Description:
 */
import { FC, useEffect, useState, useCallback } from 'react';
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
  const getPlayListDetail = useCallback(async (id: string | number) => {
    setLoading(true);
    const res: any = await playlistDetail({ id });
    if (res.code === 200) {
      const headData = res.playlist || {};
      const idsArr = assemblyIds(res.playlist.trackIds);
      await getSongDetail(idsArr);
      setHeadData(headData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  // 批量获取歌曲详情
  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    if (res.code === 200) {
      const { songs, privileges } = res;
      const musicList = mergeData(songs, privileges); // 合并数据
      setMusicList(musicList);
    }
  };

  useEffect(() => {
    setNavStatus(0);
    setMusicList([]);
    getPlayListDetail(id);
  }, [getPlayListDetail, id]);

  return (
    <Content isFull={true} padding={0}>
      <Spin spinning={loading}>
        <div className={styles.single}>
          <Content isFull={true} padding={'0 30px'}>
            <div id="head">
              <Head singleId={id} data={headData} list={musicList} callBack={getPlayListDetail} />
              <Navigation
                status={navStatus}
                list={navigationList}
                onChange={(_item: any, index: number) => setNavStatus(index)}
              />
            </div>
          </Content>
          {navStatus === 0 ? (
            <MusicList list={musicList} singleId={id} callBack={getPlayListDetail} />
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
