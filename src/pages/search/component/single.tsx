/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-24 23:38:08
 * @Description:搜索-单曲
 */
import { FC, useEffect, useState, useContext } from 'react';
import styles from '../index.module.scss';
import { Context } from '@utils/context';
import { search } from '@/common/net/search';
import { assemblyIds, mergeData } from '@/common/utils/tools';
import { songDetail } from '@/common/net/api';
import MusicList from '@/components/musicList';
const Single: FC = () => {
  // const [limit, setLimit] = useState(1);
  const [list, setList] = useState<any>([]);
  const { searchText: keywords } = useContext(Context);

  // 检索
  const getSearch = async (keywords: string) => {
    const res: any = await search({ keywords, limit: 100, type: 1 });
    console.log(res);
    const idsArr = assemblyIds(res.result.songs);
    await getSongDetail(idsArr);
  };

  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    const { songs, privileges } = res;
    const list = mergeData(songs, privileges) || []; // 合并数据
    setList(list);
  };

  useEffect(() => {
    getSearch(keywords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  return (
    <div className={styles.single}>
      <MusicList list={list} />
    </div>
  );
};

export default Single;
