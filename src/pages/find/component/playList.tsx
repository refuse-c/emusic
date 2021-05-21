/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-11 20:30:33
 * @Description:歌单
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import { playlistHot, playlistTop, playlistCatlist, highqualityTop } from '@/common/net/playList';
import { Pagination } from 'antd';
import Tags from '@components/tags';
import PlayList from '@/components/songList';
import { formatImgSize } from '@/common/utils/format';

const Recommend: FC = () => {
  const [tagList, setTagList] = useState([]);
  const [catlist, setCatlist] = useState<any>([]);
  const [playList, setPlayList] = useState({
    cat: '全部',
    total: 0,
    current: 1,
    playlists: [],
  });
  const [highList, setHighList] = useState({ coverImgUrl: '', name: '', copywriter: '' });

  // 点击热门标签回调
  const changeTag = async (tag: string) => {
    // setTag(tag);
    getHighqualityTop(tag);
    getPplaylistTop(tag, 1);
  };
  // 获取热门歌单标签
  const getPlaylistHot = async () => {
    const res: any = await playlistHot();
    const tagList = res.tags;
    setTagList(tagList);
  };

  // 切换分页
  const onChange = (current: number) => getPplaylistTop(playList.cat, current);

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

  // 获取歌单 ( 网友精选碟 )
  const getPplaylistTop = async (cat: string, current: number) => {
    const contentDom = document.getElementById('content');
    if (contentDom) contentDom.scrollTop = 0;
    const params = { order: 'hot', cat, limit: 100, offset: (current - 1) * 100 };
    const res: any = await playlistTop({ ...params });
    res.current = current || 1;
    setPlayList(res);
  };

  // 获取精品歌单
  const getHighqualityTop = async (cat: string) => {
    const params = { cat, limit: 1, before: '' };
    const res: any = await highqualityTop({ ...params });
    const playList = res.playlists[0] || {};
    setHighList(playList);
  };

  useEffect(() => {
    getPlaylistHot();
    getPlaylistCatlist();
    getPplaylistTop('', 1);
    getHighqualityTop('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Tags tag={playList.cat} list={tagList} changeTag={(cat: string) => changeTag(cat)} />
      <PlayList list={playList.playlists} />
      <div className={styles.pages}>
        <Pagination
          size="small"
          pageSize={100}
          total={playList.total}
          showSizeChanger={false}
          hideOnSinglePage={true}
          current={playList.current}
          onChange={onChange}
        />
        {console.log(catlist)}
      </div>
    </div>
  );
};

export default Recommend;
