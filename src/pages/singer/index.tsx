/*
 * @Author: REFUSE_C
 * @Date: 2021-07-08 16:14:44
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-29 10:18:24
 * @Description:歌手详情页
 */

import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import Head from './component/head';
import { artists, artistsAlbum, artistsDesc, artistsMv, artistsSimi } from '@/common/net/singer';
import Content from '@components/view/content';
import Navigation from '@/components/single-nav';
import { singerDetailNavList } from '@/common/utils/local';
import AlbumComponent from '@/components/album-list';
import VideoComponent from '@components/video';
import DescComponent from './component/desc';
import SingerComponent from '@/components/singer-list';

interface Id {
  id: number | string;
}

const SingerDetail: FC = (props: any) => {
  const id = props.match.params.id;
  const [data, setData] = useState<any>({});
  const [navStatus, setNavStatus] = useState(0);
  const [albumList, setAlbumList] = useState<any>({}); // 歌手专辑
  const [mvList, setMvList] = useState<any>({}); // 歌手视频
  const [desc, setDesc] = useState(''); // 歌手详情
  const [simiList, setSimiList] = useState([]); // 相似歌手

  // 获取歌手单曲
  const getArtists = async (id: Id) => {
    const res: any = await artists({ id });
    if (res.code === 200) {
      setData(res.artist);
    }
  };

  // 获取歌手专辑
  const getArtistsAlbum = async (id: Id) => {
    const res: any = await artistsAlbum({ id });
    if (res.code === 200) {
      setAlbumList(res);
    }
  };

  // 获取歌手MV
  const getArtistsMv = async (id: Id) => {
    const res: any = await artistsMv({ id });
    if (res.code === 200) {
      setMvList(res);
    }
  };

  // 获取歌手详情/描述
  const getArtistsDesc = async (id: Id) => {
    const res: any = await artistsDesc({ id });
    if (res.code === 200) {
      const descData = res;
      const desc = descData.introduction;
      let text = '';
      if (desc.length > 0) {
        desc.forEach((ele) => {
          text += `\n## ${ele.ti}\n +  ${ele.txt.replace(/\n/g, '\n + ')}`;
        });
      } else if (!!res.briefDesc) {
        text += `\n## 人物简介\n +  ${res.briefDesc}`;
      } else {
        text = '';
      }
      setDesc(text);
    }
  };

  // 获取歌手MV
  const getArtistsSimi = async (id: Id) => {
    const res: any = await artistsSimi({ id });
    if (res.code === 200) {
      setSimiList(res.artists);
    }
  };

  useEffect(() => {
    getArtists(id);
    getArtistsAlbum(id);
    getArtistsMv(id);
    getArtistsDesc(id);
    getArtistsSimi(id);
  }, [id]);

  return (
    <div className={styles.singerDetail}>
      <Content padding={'0 30px'} isFull>
        <Head data={data} callBack={getArtists} />
        <Navigation
          status={navStatus}
          list={singerDetailNavList}
          onChange={(_item: any, index: number) => setNavStatus(index)}
        />
      </Content>
      {navStatus === 0 ? (
        <AlbumComponent list={(albumList && albumList.hotAlbums) || []} layout="col" />
      ) : navStatus === 1 ? (
        <Content padding={30} isFull>
          <VideoComponent list={(mvList && mvList.mvs) || []} />
        </Content>
      ) : navStatus === 2 ? (
        <DescComponent text={desc} />
      ) : (
        <SingerComponent list={simiList || []} type={1} layout="col" />
      )}
    </div>
  );
};

export default SingerDetail;
