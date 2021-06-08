/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-08 22:47:34
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
import { createHashHistory } from 'history';
const history = createHashHistory();
interface Item {
  list: [];
  name: string;
  id: number | string;
  coverImgUrl: string;
  ToplistType: string;
}
// 飙升榜  ratio 字段 number 表示上升的百分比
// 新歌榜  no 字段 1表示上升(↑) 0 表示下降(↓) 30表示不变(-)
// 原创榜  publishTime不为0 表示新歌(显示icon new)

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
    return { list, id: 'artisid', name: '歌手榜', coverImgUrl: item.coverUrl, ToplistType: 'A' };
  };

  // 获取歌单内容
  const getPlayListDetail = async (id: string) => {
    const res: any = await playlistDetail({ id });
    const { name, trackIds, updateTime, coverImgUrl } = res.playlist;
    const idsArr = assemblyIds(res.playlist.trackIds);
    const list = await getSongDetail(idsArr, trackIds);
    return { list, id, name, updateTime, coverImgUrl };
  };

  // 批量获取歌曲详情
  const getSongDetail = async (ids: string, trackIds: any) => {
    const res: any = await songDetail({ ids });
    const { songs, privileges } = res;
    const mergeTrack = mergeData(privileges, trackIds) as [];
    const musicList = mergeData(songs, mergeTrack); // 合并数据
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
          const { list, ToplistType, coverImgUrl, id } = item;
          const pathName = ToplistType === 'A' ? '/recommendSong' : `/single${id}`;
          return (
            <div key={index} className={styles.item}>
              <div className={styles.img_box} onClick={() => history.push(pathName)}>
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
