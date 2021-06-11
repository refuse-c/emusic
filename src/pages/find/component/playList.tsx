/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-12 00:16:33
 * @Description:发现音乐-歌单
 */
import { FC, useEffect, useState, useContext } from 'react';
import styles from '../index.module.scss';
import { playlistHot, playlistTop, playlistCatlist, highqualityTop } from '@/common/net/playList';
import { Pagination } from 'antd';
import Tags from '@components/tags';
import { Context } from '@utils/context';
import PlayList from '@/components/songList';
import CatGroup from '@/components/catGroup';
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
  const { showModal, dispatch } = useContext(Context);

  // 点击热门标签回调
  const changeTag = async (tag: string) => {
    getHighqualityTop(tag);
    getPplaylistTop(tag, 1);
  };
  // 获取热门歌单标签
  const getPlaylistHot = async () => {
    const res: any = await playlistHot();
    if (res.code === 200) setTagList(res.tags || []);
  };

  // 切换分页
  const onChange = (current: number) => getPplaylistTop(playList.cat, current);

  // 获取歌单分类
  const getPlaylistCatlist = async () => {
    const res: any = await playlistCatlist();
    if (res.code === 200) {
      let catObj: any = [];
      const { categories, sub } = res;
      Object.getOwnPropertyNames(categories).forEach((element) => {
        const title = categories[element];
        const children = sub.filter((item: any) => item.category === Number(element));
        catObj.push({ title, children });
      });
      setCatlist(catObj);
    }
  };

  // 获取歌单 ( 网友精选碟 )
  const getPplaylistTop = async (cat: string, current: number) => {
    const contentDom = document.getElementById('content');
    if (contentDom) contentDom.scrollTop = 0;
    const params = { order: 'hot', cat, limit: 100, offset: (current - 1) * 100 };
    const res: any = await playlistTop({ ...params });
    if (res.code === 200) {
      res.current = current || 1;
      setPlayList(res);
    }
  };

  // 获取精品歌单
  const getHighqualityTop = async (cat: string) => {
    const params = { cat, limit: 1, before: '' };
    const res: any = await highqualityTop({ ...params });
    if (res.code === 200) setHighList(res.playlists[0] || {});
  };

  useEffect(() => {
    getPlaylistHot();
    getPlaylistCatlist();
    getPplaylistTop('', 1);
    getHighqualityTop('');
  }, []);

  return (
    <div className={styles.playlist}>
      {showModal === 'showCatList' && (
        <CatGroup list={catlist} active={playList.cat} changeTag={(cat: string) => changeTag(cat)} />
      )}
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
      <Tags
        tag={playList.cat}
        list={tagList}
        changeTag={(cat: string) => changeTag(cat)}
        showCallBack={() => dispatch({ type: 'showModal', data: showModal === 'showCatList' ? '' : 'showCatList' })}
      />

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
      </div>
    </div>
  );
};

export default Recommend;
