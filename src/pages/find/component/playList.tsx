/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-28 23:27:18
 * @Description:歌单
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import { playlistHot, playlistTop } from '@/common/net/playList';
import Tags from '@components/tags';
import PlayList from '@/components/playList';
const Recommend: FC = () => {
  const [tag, setTag] = useState('全部歌单');
  const [tagList, setTagList] = useState([]);
  const [playList, setPlayList] = useState([]);

  // 获取热门歌单标签
  const getPlaylistHot = async () => {
    const result: any = await playlistHot();
    const tagList = result.tags;
    setTagList(tagList);
  };

  // 获取歌单列表
  const getPplaylistTop = async () => {
    const params = { order: 'hot', cat: tag, limit: 100, offset: 0 };
    const result: any = await playlistTop({ ...params });
    const playList = result.playlists;
    setPlayList(playList);
  };

  useEffect(() => {
    getPlaylistHot();
    getPplaylistTop();
  }, []);

  return (
    <div className={styles.playlist}>
      <div className={styles.boutique}>
        <img src="" alt="" />
        <div className={styles.info}>
          <p>精品歌单</p>
          <p></p>
          <p></p>
        </div>
      </div>
      <Tags tag={tag} list={tagList} changeTag={(name: string) => setTag(name)} />
      <PlayList list={playList} />
    </div>
  );
};

export default Recommend;
