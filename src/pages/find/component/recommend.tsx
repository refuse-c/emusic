/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-16 23:19:25
 * @Description:发现音乐
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import Title from '@pages/find/component/title';
import Banner from '@components/banner';
import SingleList from '@/components/singleList';
import ExclusiveList from '@/components/exclusiveList';

import { login } from '@/common/net/login';
import { findBanner, recommendList, recommendSong, exclusive } from '@/common/net/find';
const Recommend: FC = () => {
  const [bannerList, setBannerList] = useState([]);
  const [singleList, setSingleList] = useState([]);
  const [songList, setSongList] = useState([]);
  const [exclusiveList, setExclusiveList] = useState([]);

  /**
   * @name:登录
   * @param {*} async
   * @Description:
   */
  const getLogin = async () => {
    const result: any = await login({ phone: '13272946536', password: 'wangyi123@@' });
    console.log(result);
  };

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
    const obj = { name: '每日推荐音乐', identifying: true };
    const singleList = result.recommend || [];
    singleList.unshift(obj);
    singleList.length = 10;
    setSingleList(singleList);
  };

  /**
   * @name:获取每日推荐歌曲
   * @param {*} async
   * @Description:
   */
  const getRecommendSong = async () => {
    const result: any = await recommendSong();
    const songList = result.data.dailySongs || [];
    setSongList(songList);
  };

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

  useEffect(() => {
    getLogin();
    getFindBanner();
    getRecommendList();
    getRecommendSong();
    getExclusiveList();
  }, []);

  return (
    <div className={styles.recommend}>
      <Banner list={bannerList || []} />
      <Title title="推荐歌单" pathName="/find/playlist" />
      <SingleList list={singleList || []} />
      <Title title="独家放送" pathName="/exclusive" />
      <ExclusiveList list={exclusiveList} isAdaptive={false} />
      <Title title="最新音乐" pathName="/find/playlist" />
      <Title title="推荐MV" pathName="/find/playlist" />
      <Title title="主播电台" pathName="/find/playlist" />
      <Title title="看看" pathName="/find/playlist" />
      {songList.map((item: any, index: number) => {
        return <li key={index}>{item.name}</li>;
      })}
      {singleList.map((item: any, index: number) => {
        return <li key={index}>{item.name}</li>;
      })}
    </div>
  );
};

export default Recommend;
