/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-12 00:00:53
 * @Description:搜索-歌单
 */
import { FC, useEffect, useState, useContext, useCallback } from 'react';
import styles from '../index.module.scss';
import { Context } from '@utils/context';
import { search } from '@/common/net/search';
import SongList from '@components/songList';
import { Spin } from 'antd';
import Content from '@components/view/content';
const PlayList: FC = () => {
  const [list, setList] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const { searchText: keywords, dispatch } = useContext(Context);

  // 检索
  const getSearch = useCallback(
    async (keywords: string) => {
      setList([]);
      setloading(true);
      const res: any = await search({ keywords, type: 1000, limit: 50 });
      if (res.code === 200) {
        const { playlists = [], playlistCount } = res && res.result;
        const data = { type: 1000, total: playlistCount || 0 };
        setList(playlists || []);
        setloading(false);
        dispatch({ type: 'searchInfo', data });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    getSearch(keywords);
  }, [getSearch, keywords]);

  return (
    <Spin spinning={loading}>
      <Content padding={'0 30px'} isFull={true}>
        <div className={styles.box}>
          {list.length && !loading ? (
            <SongList list={list} />
          ) : !loading ? (
            <p className={styles.empty}>
              很抱歉,未能找到与" <span style={{ color: '#507DAF' }}>{keywords}</span> "相关的任何歌单
            </p>
          ) : null}
        </div>
      </Content>
    </Spin>
  );
};

export default PlayList;
