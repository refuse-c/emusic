/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-23 23:44:59
 * @Description:发现音乐-个性推荐
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import Title from '@components/title';
import Banner from '@components/banner';
import PlayList from '@/components/songList';
import ExclusiveList from '@/components/exclusiveList';
import Songs from '@/components/song';
import MvList from '@/components/mvList';
import RadioList from '@/components/radioList';
import Loading from '@/components/loading';

import { findBanner, recommendList, exclusive, personalizedMv, recommendDj } from '@/common/net/find';
import moment from 'moment';
import img from '@images/icon_mask_layer4.png';
import { newMusic, songDetail } from '@/common/net/api';
import { assemblyIds, mergeData } from '@/common/utils/tools';
const Recommend: FC = () => {
  const [bannerList, setBannerList] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [exclusiveList, setExclusiveList] = useState([]);
  const [newMusicList, setNewMusicList] = useState<any>([]);
  const [mvList, setMvList] = useState([]);
  const [radioList, setRadioList] = useState([]);

  /**
   * @name:获取轮播图
   * @param {*} async
   * @Description:
   */
  const getFindBanner = async () => {
    const result: any = await findBanner();
    const bannerList = result.banners || [];
    setBannerList(bannerList);
  };

  /**
   * @name:获取每日推荐歌单
   * @param {*} async
   * @Description:
   */
  const getRecommendList = async () => {
    const result: any = await recommendList();
    const obj = { name: '每日推荐音乐', identifying: true, picUrl: img, day: moment().format('DD') };
    const playList = result.recommend || [];
    playList.unshift(obj);
    playList.length = 10;
    setPlayList(playList);
  };

  /**
   * @name:获取每日推荐歌曲
   * @param {*} async
   * @Description:
   */
  // const getRecommendSong = async () => {
  //   const result: any = await recommendSong();
  //   const songList = result.data.dailySongs || [];
  //   setSongList(songList);
  // };

  /**
   * @name:获取独家放送入口列表
   * @param {*} async
   * @Description:
   */
  const getExclusiveList = async () => {
    const result: any = await exclusive();
    const exclusiveList = result.result || [];
    setExclusiveList(exclusiveList);
  };

  /**
   * @name:最新音乐
   * @param {*} async
   * @Description:
   */
  const getNewMusic = async () => {
    const result: any = await newMusic();
    const arr = result.data || [];
    const idsArr = assemblyIds(arr);
    await getSongDetail(idsArr);
  };

  /**
   * @name:推荐mv
   * @param {*} async
   * @Description:
   */
  const getPersonalizedMv = async () => {
    const result: any = await personalizedMv();
    const mvList = result.result || [];
    setMvList(mvList);
  };

  /**
   * @name:主播电台
   * @param {*} async
   * @Description:
   */
  const getRecommendDj = async () => {
    const result: any = await recommendDj();
    console.log(result);
    const radioList = result.data || [];
    setRadioList(radioList);
  };

  // 批量获取歌曲详情
  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    if (res.code === 200) {
      const { songs, privileges } = res;
      const arr = mergeData(songs, privileges); // 合并数据
      const list = arr.filter((item) => item.fee !== -200 && item.fee !== 4);
      list.length = list.length > 12 ? 12 : list.length;
      setNewMusicList(list);
    }
  };

  useEffect(() => {
    getFindBanner();
    getRecommendList();
    getExclusiveList();
    getNewMusic();
    getPersonalizedMv();
    getRecommendDj();
    return () => {
      setBannerList([]);
      setPlayList([]);
      setExclusiveList([]);
      setNewMusicList([]);
      setMvList([]);
      setRadioList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.recommend}>
      <Loading />
      <Banner list={bannerList || []} />
      <Title title="推荐歌单" margin={'10px  0'} path="/find/playlist" />
      <PlayList list={playList || []} />
      <Title title="独家放送" margin={'10px  0'} path="/exclusive" />
      <ExclusiveList list={exclusiveList} isAdaptive={false} />
      <Title title="最新音乐" margin={'10px  0'} path="/find/newmusic" />
      <Songs list={newMusicList} />
      <Title title="推荐MV" margin={'10px  0'} path="/video/mv" />
      <MvList list={mvList} hideLst={true} showTips={true} />
      <Title title="主播电台" margin={'10px  0'} path="/find/radio" />
      <RadioList list={radioList} />
      {/* <Title title="看看" pathName="/find/playlist" /> */}
    </div>
  );
};

export default Recommend;
