/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-08 15:09:55
 * @Description:搜索-歌手
 */

import { FC, useEffect, useState, useContext, useCallback } from 'react';
import styles from '../index.module.scss';
import { Context } from '@utils/context';
import { search } from '@/common/net/search';
import SingerComponent from '@components/singer';
import { Spin } from 'antd';
const Singer: FC = () => {
  const [list, setList] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const { searchText: keywords, dispatch } = useContext(Context);

  // 检索
  const getSearch = useCallback(
    async (keywords: string) => {
      setList([]);
      setloading(true);
      const res: any = await search({ keywords, type: 100, limit: 100 });
      if (res.code === 200) {
        const { artists = [], artistCount } = res && res.result;
        const data = { type: 100, total: artistCount || 0 };
        setloading(false);
        setList(artists || []);
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
      <div className={styles.box}>
        {list.length && !loading ? (
          <SingerComponent list={list} type={2} layout="row" />
        ) : !loading ? (
          <p className={styles.empty}>
            很抱歉,未能找到与" <span style={{ color: '#507DAF' }}>{keywords}</span> "相关的任何歌手
          </p>
        ) : null}
      </div>
    </Spin>
  );
};

export default Singer;
