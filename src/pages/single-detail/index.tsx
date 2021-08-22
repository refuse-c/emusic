/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:11:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-10 15:27:40
 * @Description:
 */
import { FC, useEffect, useState, useCallback } from 'react';
import { Spin } from 'antd';
import Head from './component/head';
import styles from './index.module.scss';
import { songDetail } from '@/common/net/api';
import MusicList from '@/components/music-list';
import Navigation from '@/components/single-nav';
import Comments from '@components/comments';
import Collectors from '@components/collectors';
import { playlistDetail } from '@/common/net/playList';
import { assemblyIds, mergeData } from '@/common/utils/tools';
import { NAVIGATION_LIST } from '@/common/utils/constant';
import Content from '@components/view/content';
import { album, albumDynamic } from '@/common/net/album';

const Single: FC = (props: any) => {
  const { id, type } = props.match.params;
  const [musicList, setMusicList] = useState<any>([]);
  const [headData, setHeadData] = useState({ coverImgUrl: '' });
  const [loading, setLoading] = useState(false);
  const [navStatus, setNavStatus] = useState(0);
  const [albumInfo, setAlbumInfo] = useState({});
  const status = type === '专辑';
  // 获取歌单内容
  const getPlayListDetail = useCallback(
    async (id: string | number) => {
      setLoading(true);
      const res: any = status ? await album({ id }) : await playlistDetail({ id });

      if (res.code === 200) {
        const headData = status ? res.album : res.playlist || {};
        const idsArr = assemblyIds(status ? res.songs : res.playlist.trackIds);
        await getSongDetail(idsArr);
        setHeadData(headData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    },
    [status]
  );

  // 获取专辑信息
  const getAlbumDynamic = async (id) => {
    const res: any = await albumDynamic({ id });
    if (res.code === 200) setAlbumInfo(res);
  };

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
    if (status) getAlbumDynamic(id);
  }, [getPlayListDetail, id, status]);
  return (
    <Content isFull={true} padding={0}>
      <Spin spinning={loading}>
        <div className={styles.single}>
          <Content isFull={true} padding={'0 30px'}>
            <div id="head">
              <Head
                singleId={id}
                type={type}
                data={headData}
                info={albumInfo}
                list={musicList}
                callBack={status ? getAlbumDynamic : getPlayListDetail}
              />
              <Navigation
                status={navStatus}
                list={NAVIGATION_LIST}
                onChange={(_item: any, index: number) => setNavStatus(index)}
              />
            </div>
          </Content>
          {navStatus === 0 ? (
            <MusicList list={musicList} singleId={id} callBack={getPlayListDetail} />
          ) : navStatus === 1 ? (
            <Comments />
          ) : (
            <Collectors id={id} />
          )}
        </div>
      </Spin>
    </Content>
  );
};

export default Single;
