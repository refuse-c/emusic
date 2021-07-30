/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-24 14:06:59
 * @Description:搜索-单曲
 */
import { FC, useEffect, useState, useContext, useCallback } from 'react';
import styles from '../index.module.scss';
import { Context } from '@utils/context';
import { search } from '@/common/net/search';
import { assemblyIds, mergeData } from '@/common/utils/tools';
import { songDetail } from '@/common/net/api';
import MusicList from '@/components/music-list';
import { Spin } from 'antd';
const Single: FC = () => {
  const [list, setList] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const { searchText: keywords, dispatch } = useContext(Context);

  // 检索
  const getSearch = useCallback(
    async (keywords: string) => {
      setList([]);
      setloading(true);
      const res: any = await search({ keywords, limit: 100, type: 1 });
      if (res.code === 200) {
        const { songs = [], songCount } = res && res.result;
        // 没数据就清除loading
        if (songs.length) {
          const idsArr = songs.length && assemblyIds(songs);

          await getSongDetail(idsArr);
        } else {
          setloading(false);
        }
        const data = { type: 1, total: songCount || 0 };
        dispatch({ type: 'searchInfo', data });
      }
    },
    [dispatch],
  );

  const getSongDetail = async (ids: string) => {
    setloading(true);
    const res: any = await songDetail({ ids });
    if (res.code === 200) {
      const { songs, privileges } = res;
      const list = mergeData(songs, privileges) || []; // 合并数据
      setList(list);
      setloading(false);
    }
  };

  useEffect(() => {
    getSearch(keywords);
  }, [getSearch, keywords]);

  return (
    <Spin spinning={loading}>
      <div className={styles.box}>
        {list.length && !loading ? (
          <MusicList list={list} loading={loading} searchText={keywords} />
        ) : !loading ? (
          <p className={styles.empty}>
            很抱歉,未能找到与" <span style={{ color: '#507DAF' }}>{keywords}</span> "相关的任何歌曲
          </p>
        ) : null}
      </div>
    </Spin>
  );
};

export default Single;
