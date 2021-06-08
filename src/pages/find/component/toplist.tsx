/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-08 17:06:15
 * @Description:发现音乐-排行榜
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import Title from '@components/title';
import { toplist, toplistArtist } from '@/common/net/topList';
import PlayList from '@/components/songList';
import { playlistDetail } from '@/common/net/playList';
import { assemblyIds, getSession, mergeData, setSession } from '@/common/utils/tools';
import { songDetail } from '@/common/net/api';
import { formatImgSize } from '@/common/utils/format';
interface Item {
  list: [];
  name: string;
  id: number | string;
  coverImgUrl: string;
}

const TopList: FC = () => {
  const [official, setOfficial] = useState<any>(getSession('official') || []);
  const [worldwide, setWorldwide] = useState(getSession('worldwide') || []);
  const getTopList = async () => {
    const res: any = await toplist();
    const { code, list, artistToplist } = res;
    if (code === 200) {
      const aa = list.filter((item: { ToplistType: string | undefined }) => item.ToplistType !== undefined); // 官方榜
      const bb = list.filter((item: { ToplistType: string | undefined }) => item.ToplistType === undefined); // 全球榜
      artistToplist.ToplistType = 'A';
      const cc = aa.concat(artistToplist);
      setSession('worldwide', cc);
      setWorldwide(bb);
      queryAListDetail(cc);
    }
  };

  // 歌手榜单
  const queryToplistArtist = async (item: { coverUrl: string }) => {
    const res = await toplistArtist();
    const list = res.list.artists;
    return { list, id: 'artisid', name: '歌手榜', coverImgUrl: item.coverUrl };
  };

  // 获取歌单内容
  const getPlayListDetail = async (id: string) => {
    const res: any = await playlistDetail({ id });
    const { name, updateTime, coverImgUrl } = res.playlist;
    const idsArr = assemblyIds(res.playlist.trackIds);
    const list = await getSongDetail(idsArr);
    return { list, id, name, updateTime, coverImgUrl };
  };

  // 批量获取歌曲详情
  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    const { songs, privileges } = res;
    const musicList = mergeData(songs, privileges); // 合并数据
    return musicList;
  };

  const queryAListDetail = (list: any) => {
    const promises = list.map((item: any) =>
      item.ToplistType === 'A' ? queryToplistArtist(item) : getPlayListDetail(item.id),
    );
    Promise.all(promises).then((official) => {
      console.log(official);
      setSession('official', official);
      setOfficial(official);
    });
  };

  useEffect(() => {
    getTopList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.topList}>
      <Title text="官方版" />
      <div className={styles.list}>
        {official.map((item: Item, index: number) => {
          const { list, coverImgUrl } = item;
          return (
            <div key={index} className={styles.item}>
              <div className={styles.img_box}>
                <img src={formatImgSize(coverImgUrl, 172, 172)} alt="" />
              </div>
              <ul className={styles.songList}>
                {list.map((child: any, _index) => {
                  return _index < 5 && <li key={_index}>{child.name}</li>;
                })}
                <div className={styles.viewAll}>查看全部</div>
              </ul>
            </div>
          );
        })}
      </div>
      <Title text="全球榜" />
      <PlayList list={worldwide || []} />
    </div>
  );
};

export default TopList;
