/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-05 22:01:12
 * @Description:发现音乐-最新音乐
 */
import { FC, useState, useEffect, useCallback, useContext } from 'react';
import styles from '../index.module.scss';
import Content from '@components/view/content';
import { newMusic, songDetail } from '@/common/net/api';
import { assemblyIds, mergeData } from '@/common/utils/tools';
import { Context } from '@utils/context';
import { NEW_MUSIC_NAV, AREA_LIST, ALBUM_LIST } from '@/common/utils/constant';
import EllipticalNav from '@/components/elliptical-nav';
import Navigation from '@/components/single-nav';
import MusicList from '@components/music-list';
import TopAblum from './component/top-album';

import { formatAvailableSongs } from '@/common/utils/format';
import { message } from 'antd';
const Newmusic: FC = () => {
  const [type, setType] = useState(0);
  const [state, setstate] = useState(0);
  const [musicList, setMusicList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [albumStatus, setAlbumStatus] = useState(0);
  const { dispatch } = useContext(Context);

  // 获取最新音乐列表
  const getNewMusic = useCallback(async (key) => {
    setLoading(true);
    setMusicList([]);
    const type = AREA_LIST[key].key;
    const res: any = await newMusic({ type: type === '-1' ? '0' : type });
    const arr = res.data || [];
    const idsArr = assemblyIds(arr);
    await getSongDetail(idsArr);
    setLoading(false);
  }, []);

  // 批量获取歌曲详情
  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    if (res.code === 200) {
      const { songs, privileges } = res;
      const arr = mergeData(songs, privileges); // 合并数据
      const list = arr;
      // .filter((item) => item.fee !== -200 && item.fee !== 4);
      setMusicList(list);
    }
  };

  // 播放全部
  const playAll = () => {
    const canbeusedList = formatAvailableSongs(musicList);
    if (canbeusedList.length) {
      dispatch({ type: 'songList', data: canbeusedList });
      dispatch({ type: 'currentSong', data: canbeusedList[0] });
    }
  };

  // 组装新歌速递右侧按钮
  const singleBtn = () => {
    return (
      <ul className={styles.singleBtn}>
        <li onClick={playAll}>播放全部</li>
        <li onClick={() => message.info('开发中')}>收藏全部</li>
      </ul>
    );
  };

  // 组装新碟上架右侧按钮
  const albumleBtn = () => {
    return (
      <ul className={styles.albumleBtn}>
        {ALBUM_LIST.map((item, index) => {
          const cls = index === albumStatus ? styles.active : '';
          return (
            <li className={cls} onClick={() => setAlbumStatus(index)}>
              {item.title}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    !state && getNewMusic(type);
  }, [getNewMusic, type, state]);

  return (
    <div className={styles.newmusic}>
      <Content padding={'0 30px 30px'} isFull={false}>
        <div className={styles.nav1}>
          <EllipticalNav
            list={NEW_MUSIC_NAV}
            status={state}
            onChange={(state: number) => {
              setstate(state);
              setType(0);
            }}
          />
        </div>
        <Navigation status={type} list={AREA_LIST} onChange={(_item: any, index: number) => setType(index)}>
          {!state ? singleBtn() : albumleBtn()}
        </Navigation>
      </Content>
      <Content padding={0} isFull={false}>
        {!state ? (
          <MusicList list={musicList} columnsType={false} loading={loading} />
        ) : (
          <TopAblum areaType={type} status={albumStatus} />
        )}
      </Content>
    </div>
  );
};

export default Newmusic;
