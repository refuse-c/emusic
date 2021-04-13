/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-13 21:46:33
 * @Description:发现音乐
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import Title from '@pages/find/component/title';
import { login } from '@/common/net/login';
import { findBanner, recommendList, recommendSong } from '@/common/net/find';
const Recommend: FC = () => {
  const [bannerList, setBannerList] = useState([]);
  const [songList, setSongList] = useState([]);
  const [SingleList, setSingleList] = useState([]);
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
   * @name:获取每日推荐歌单
   * @param {*} async
   * @Description:
   */
  const getRecommendList = async () => {
    const result: any = await recommendList();
    const songList = result.recommend || [];
    setSingleList(songList);
  };

  useEffect(() => {
    getLogin();
    getFindBanner();
    getRecommendSong();
    getRecommendList();
  }, []);

  return (
    <div className={styles.recommend}>
      <Title title="推荐歌单" pathName="/find/playlist" />
      <Title title="独家放送" pathName="/find/playlist" />
      <Title title="最新音乐" pathName="/find/playlist" />
      <Title title="推荐MV" pathName="/find/playlist" />
      <Title title="主播电台" pathName="/find/playlist" />
      <Title title="看看" pathName="/find/playlist" />
      {songList.map((item: any, index: number) => {
        return <li key={index}>{item.name}</li>;
      })}
      {SingleList.map((item: any, index: number) => {
        return <li key={index}>{item.name}</li>;
      })}
      {console.log(bannerList)}
    </div>
  );
};

export default Recommend;
