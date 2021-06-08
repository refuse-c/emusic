/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-08 14:13:51
 * @Description:发现音乐-个性推荐
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import Title from '@pages/find/component/title';
import Banner from '@components/banner';
import PlayList from '@/components/songList';
import ExclusiveList from '@/components/exclusiveList';
import Songs from '@/components/song';
import MvList from '@/components/mvList';
import RadioList from '@/components/radioList';
import { findBanner, recommendList, exclusive, personalizedMv, recommendDj } from '@/common/net/find';
import moment from 'moment';
import img from '@images/icon_mask_layer4.png';
import { newMusic } from '@/common/net/api';
const Recommend: FC = () => {
  const [bannerList, setBannerList] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [exclusiveList, setExclusiveList] = useState([]);
  const [newMusicList, setNewMusicList] = useState([]);
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
    const newMusicList = result.data || [];
    newMusicList.length = 12;
    setNewMusicList(newMusicList);
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
   * @name:推荐mv
   * @param {*} async
   * @Description:
   */
  const getRecommendDj = async () => {
    const result: any = await recommendDj();
    const radioList = result.data || [];
    setRadioList(radioList);
  };

  useEffect(() => {
    getFindBanner();
    getRecommendList();
    // getRecommendSong();
    getExclusiveList();
    getNewMusic();
    getPersonalizedMv();
    getRecommendDj();
  }, []);

  return (
    <div className={styles.recommend}>
      <Banner list={bannerList || []} />
      <Title title="推荐歌单" top={5} pathName="/find/playlist" />
      <PlayList list={playList || []} />
      <Title title="独家放送" top={10} pathName="/exclusive" />
      <ExclusiveList list={exclusiveList} isAdaptive={false} />
      <Title title="最新音乐" top={10} pathName="/find/newmusic" />
      <Songs list={newMusicList} />
      <Title title="推荐MV" top={10} pathName="/video/mv" />
      <MvList list={mvList} hideLst={true} showTips={true} />
      <Title title="主播电台" top={10} pathName="/find/radio" />
      <RadioList list={radioList} />
      {/* <Title title="看看" pathName="/find/playlist" /> */}
    </div>
  );
};

export default Recommend;
