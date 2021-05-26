/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-26 22:24:15
 * @Description:搜索-单曲
 */
import { FC, useEffect, useState, useContext } from 'react';
import styles from '../index.module.scss';
import { Context } from '@utils/context';
import { search } from '@/common/net/search';
import { assemblyIds, mergeData } from '@/common/utils/tools';
import { songDetail } from '@/common/net/api';
import MusicList from '@/components/musicList';
import { Spin } from 'antd';
const Single: FC = () => {
  const [list, setList] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const { searchText: keywords, dispatch } = useContext(Context);

  // 检索
  const getSearch = async (keywords: string) => {
    setList([]);
    setloading(true);
    const res: any = await search({ keywords, limit: 100, type: 1 });
    const { songs = [], songCount } = res && res.result;
    const idsArr = songs.length && assemblyIds(songs);
    const data = { type: 1, total: songCount || 0 };
    await getSongDetail(idsArr);
    dispatch({ type: 'searchInfo', data });
  };

  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    const { songs, privileges } = res;
    const list = mergeData(songs, privileges) || []; // 合并数据
    setList(list);
    setloading(false);
  };

  useEffect(() => {
    getSearch(keywords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  return (
    <Spin spinning={loading}>
      <div className={styles.box}>
        {list.length && !loading ? (
          <MusicList list={list} loading={loading} />
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
