/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-01 02:04:24
 * @Description:歌单
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import { playlistHot, playlistTop, highqualityTags, playlistCatlist, highqualityTop } from '@/common/net/playList';
import Tags from '@components/tags';
import PlayList from '@/components/playList';
import { formatImgSize } from '@/common/utils/format';

const Recommend: FC = () => {
  const [tag, setTag] = useState('全部歌单');
  const [tagList, setTagList] = useState([]);
  const [catlist, setCatlist] = useState<any[]>([]);
  const [playList, setPlayList] = useState([]);
  const [highTags, setHighTags] = useState([]);
  const [highList, setHighList] = useState({ coverImgUrl: '', name: '', copywriter: '' });

  // 点击热门标签回调
  const changeTag = async (tag: string) => {
    await setTag(tag);
    getHighqualityTop(tag);
    getPplaylistTop(tag);
  };
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
  const getPplaylistTop = async (cat: string) => {
    const params = { order: 'hot', cat, limit: 100, offset: 0 };
    const res: any = await playlistTop({ ...params });
    const playList = res.playlists;
    setPlayList(playList);
  };

  // 获取精品歌单
  const getHighqualityTop = async (cat: string) => {
    const params = { cat, limit: 1, before: '' };
    const res: any = await highqualityTop({ ...params });
    console.log(res);
    const playList = res.playlists[0] || {};
    setHighList(playList);
  };

  useEffect(() => {
    getPlaylistHot();
    getPlaylistCatlist();
    getHighqualityTags();
    getPplaylistTop('');
    getHighqualityTop('');
  }, []);

  return (
    <div className={styles.playlist}>
      {highList.coverImgUrl ? (
        <div className={styles.boutique}>
          <img src={formatImgSize(highList.coverImgUrl, 140, 140)} alt="" />
          <div className={styles.info}>
            <span>精品歌单</span>
            <p>{highList.name}</p>
            <p>{highList.copywriter}</p>
          </div>
          <div
            className={styles.bg}
            style={{ backgroundImage: `url(${formatImgSize(highList.coverImgUrl, 200, 200)})` }}
          ></div>
        </div>
      ) : null}
      <Tags tag={tag} list={tagList} changeTag={(cat: string) => changeTag(cat)} />
      <PlayList list={playList} />
      {console.log(highTags)}
      {console.log(catlist)}
      {console.log(highList)}
    </div>
  );
};

export default Recommend;
