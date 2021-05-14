/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:11:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-14 09:16:56
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
const Single: FC = (props: any) => {
  const id = props.match.params.id;
  const [musicList, setMusicList] = useState<any>([]);
  const [headData, setHeadData] = useState({ coverImgUrl: '' });
  const [loading, setLoading] = useState(false);
  const [navStatus, setNavStatus] = useState(0);

  const getPlayListDetail = async (id: string) => {
    setLoading(true);
    const res: any = await playlistDetail({ id });
    const headData = res.playlist || {};
    const idsArr = assemblyIds(res.playlist.trackIds);
    getSongDetail(idsArr);
    setHeadData(headData);
    setLoading(false);
  };

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
    <Spin spinning={loading}>
      <div className={styles.single}>
        <Head data={headData} />
        <Navigation status={navStatus} list={navigationList} onChange={(index: number) => setNavStatus(index)} />
        {navStatus === 0 ? <MusicList list={musicList} /> : navStatus === 1 ? <Comments /> : <Collectors />}
      </div>
    </Spin>
  );
};

export default Single;
