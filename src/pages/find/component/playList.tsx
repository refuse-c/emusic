/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-29 22:51:59
 * @Description:歌单
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import { playlistHot, playlistTop, highqualityTags, playlistCatlist } from '@/common/net/playList';
import Tags from '@components/tags';
import PlayList from '@/components/playList';

const Recommend: FC = () => {
  const [tag, setTag] = useState('全部歌单');
  const [tagList, setTagList] = useState([]);
  const [catlist, setCatlist] = useState<any[]>([]);
  const [playList, setPlayList] = useState([]);
  const [highTags, setHighTags] = useState([]);

  // 获取热门歌单标签
  const getPlaylistHot = async () => {
    const res: any = await playlistHot();
    const tagList = res.tags;
    setTagList(tagList);
  };
  // 获取歌单分类
  const getPlaylistCatlist = async () => {
    const res: any = await playlistCatlist();
    const { categories, sub } = res;
    Object.getOwnPropertyNames(categories).forEach((element) => {
      const title = categories[element];
      const list = sub.filter((item: any) => item.category === Number(element));
      const obj = { title, list };
      catlist.push(obj);
    });
    setCatlist(catlist);
  };
  // 获取精品歌单标签
  const getHighqualityTags = async () => {
    const res: any = await highqualityTags();
    const highTags = res.tags;
    setHighTags(highTags);
  };

  // 获取歌单列表
  const getPplaylistTop = async () => {
    const params = { order: 'hot', cat: tag, limit: 100, offset: 0 };
    const res: any = await playlistTop({ ...params });
    const playList = res.playlists;
    setPlayList(playList);
  };

  useEffect(() => {
    getPlaylistHot();
    getPlaylistCatlist();
    getHighqualityTags();
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
      {console.log(highTags)}
      {console.log(catlist)}
    </div>
  );
};

export default Recommend;
