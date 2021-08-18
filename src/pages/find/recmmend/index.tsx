/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-18 16:33:29
 * @Description:发现音乐-个性推荐
 */
import {
  findBanner,
  recommendList,
  exclusive,
  personalizedMv,
  recommendDj,
} from '@/common/net/find';
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
import moment from 'moment';
import DragSort from '@/components/model/dragsort';
import img from '@images/icon_mask_layer4.png';
import { newMusic, songDetail } from '@/common/net/api';
import { assemblyIds, mergeData } from '@/common/utils/tools';

const Recommend: FC = () => {
  const [banners, setBanner] = useState([]); // 轮播图数据
  const [array, setArray] = useState<any>([]); // 其他数据
  const [hasShow, setHasShow] = useState<any>(false); // 其他数据

  // 批量获取歌曲详情
  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    const { songs, privileges } = res;
    const arr = mergeData(songs, privileges); // 合并数据
    const list = arr.filter((item) => item.fee !== -200 && item.fee !== 4);
    list.length = list.length > 12 ? 12 : list.length;
    return list;
  };

  const getAllData = useCallback(() => {
    Promise.all([
      findBanner(),
      recommendList(),
      exclusive(),
      newMusic({ type: '0' }),
      personalizedMv(),
      recommendDj(),
    ]).then(
      async ([
        { banners = [] },
        { result: recommend = [] },
        { result: exclusives = [] },
        { data: list = [] },
        { result: mv = [] },
        { data: dj = [] },
      ]: any) => {
        const obj = {
          name: '每日推荐音乐',
          identifying: true,
          picUrl: img,
          day: moment().format('DD'),
        };
        const newmusic = await getSongDetail(assemblyIds(list));
        recommend.unshift(obj);
        recommend.length = 10;
        const data = { recommend, exclusives, newmusic, mv, dj };
        const array = [
          {
            title: '推荐歌单',
            margin: '10px 0',
            path: '/find/playlist',
            Component: <PlayList list={data.recommend || []} fixedNum={true} />,
          },
          {
            title: '独家放送',
            margin: '10px 0',
            path: '/exclusive',
            Component: (
              <ExclusiveList list={data.exclusives || []} isAdaptive={false} />
            ),
          },
          {
            title: '最新音乐',
            margin: '10px 0',
            path: '/find/newmusic',
            Component: <Songs list={data.newmusic || []} />,
          },
          {
            title: '推荐MV',
            margin: '10px 0',
            path: '/video/mv',
            Component: (
              <MvList list={data.mv || []} hideLst={true} showTips={true} />
            ),
          },
          {
            title: '主播电台',
            margin: '10px 0',
            path: '/find/radio',
            Component: <RadioList list={data.dj || []} />,
          },
        ];
        setArray(array);
        setBanner(banners);
      }
    );
  }, []);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <Content padding={'0 30px 30px'} isFull={false}>
      <Loading />
      <DragSort
        list={array}
        title="调整栏目顺序"
        hasShow={hasShow}
        setArray={setArray}
        onClose={() => setHasShow(false)}
        msg={'想调整首页栏目的顺序?按住右边的按钮拖动即可'}
      />
      {!!banners.length && <Banner list={banners || []} />}
      {array.map((item, index) => {
        const { path, title, Component } = item;
        return (
          <div key={index}>
            <Title title={title} margin={'10px  0'} path={path} />
            {Component}
          </div>
        );
      })}
      {!!array.length && (
        <div className={styles.sort}>
          <p>现在可以根据个人喜好，自由调整首页栏目顺序啦~</p>
          <div onClick={() => setHasShow(true)}>调整栏目顺序</div>
        </div>
      )}
    </Content>
  );
};

export default Recommend;
