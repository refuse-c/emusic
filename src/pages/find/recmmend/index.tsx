/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-05 21:54:40
 * @Description:发现音乐-个性推荐
 */
import { FC, useEffect, useState, useCallback } from 'react';
import styles from '../index.module.scss';
import Title from '@components/title';
import Banner from '@components/banner';
import PlayList from '@/components/song-list';
import ExclusiveList from '@/components/exclusive-list';
import Songs from '@/components/new-music-list';
import MvList from '@/components/mv-list';
import RadioList from '@/components/radio-list';
import Loading from '@/components/loading';
import Content from '@components/view/content';

import {
  findBanner,
  recommendList,
  exclusive,
  personalizedMv,
  recommendDj,
} from '@/common/net/find';
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

  // const list = [
  //   {
  //     title: '推荐歌单',
  //     margin: '10px 0',
  //     path: '/find/playlist',
  //     Component: <PlayList list={playList || []} />,
  //   },
  //   {
  //     title: '独家放送',
  //     margin: '10px 0',
  //     path: '/exclusive',
  //     Component: <ExclusiveList list={exclusiveList} isAdaptive={false} />,
  //   },
  //   {
  //     title: '最新音乐',
  //     margin: '10px 0',
  //     path: '/find/newmusic',
  //     Component: <Songs list={newMusicList} />,
  //   },
  //   {
  //     title: '推荐MV',
  //     margin: '10px 0',
  //     path: '/video/mv',
  //     Component: <MvList list={mvList} hideLst={true} showTips={true} />,
  //   },
  //   {
  //     title: '主播电台',
  //     margin: '10px 0',
  //     path: '/find/radio',
  //     Component: <RadioList list={radioList} />,
  //   },
  // ];
  // const [moduleList, setList] = useState(list || []);
  // setList(list);
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
    const obj = {
      name: '每日推荐音乐',
      identifying: true,
      picUrl: img,
      day: moment().format('DD'),
    };
    const playList = result.recommend || [];
    playList.unshift(obj);
    playList.length = 10;
    setPlayList(playList);
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

  /**
   * @name:最新音乐
   * @param {*} async
   * @Description:
   */
  const getNewMusic = useCallback(async () => {
    const result: any = await newMusic({ type: '0' });
    const arr = result.data || [];
    const idsArr = assemblyIds(arr);
    await getSongDetail(idsArr);
  }, []);

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
  }, [getNewMusic]);

  return (
    <Content padding={'0 30px 30px'} isFull={false}>
      <Loading />
      <Banner list={bannerList || []} />
      {/* {moduleList.map((item, index) => {
        const { Component, path, title } = item;
        return (
          <div key={index}>
            <Title title={title} margin={'10px  0'} path={path} />
            {Component}
          </div>
        );
      })} */}
      <Title title="推荐歌单" margin={'10px  0'} path="/find/playlist" />
      <PlayList list={playList || []} fixedNum={true} />
      <Title title="独家放送" margin={'10px  0'} path="/exclusive" />
      <ExclusiveList list={exclusiveList} isAdaptive={false} />
      <Title title="最新音乐" margin={'10px  0'} path="/find/newmusic" />
      <Songs list={newMusicList} />
      <Title title="推荐MV" margin={'10px  0'} path="/video/mv" />
      <MvList list={mvList} hideLst={true} showTips={true} />
      <Title title="主播电台" margin={'10px  0'} path="/find/radio" />
      <RadioList list={radioList} />
      <div className={styles.sort}>
        <p>现在可以根据个人喜好，自由调整首页栏目顺序啦~</p>
        <div>调整栏目顺序</div>
      </div>
    </Content>
  );
};

export default Recommend;
