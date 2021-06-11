/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-12 00:06:22
 * @Description:搜索-视频
 */
import { FC, useEffect, useState, useContext, useCallback } from 'react';
import styles from '../index.module.scss';
import { Context } from '@utils/context';
import { search } from '@/common/net/search';
import Video from '@components/video';
import { Spin } from 'antd';
const Vidoe: FC = () => {
  const [list, setList] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const { searchText: keywords, dispatch } = useContext(Context);

  // 检索
  const getSearch = useCallback(
    async (keywords: string) => {
      setList([]);
      setloading(true);
      const res: any = await search({ keywords, type: 1014, limit: 100 });
      if (res.code === 200) {
        const { videos = [], videoCount = 0 } = res && res.result;
        const data = { type: 1014, total: videoCount };
        setloading(false);
        setList(videos || []);
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
          <Video list={list} />
        ) : !loading ? (
          <p className={styles.empty}>
            很抱歉,未能找到与" <span style={{ color: '#507DAF' }}>{keywords}</span> "相关的任何视频
          </p>
        ) : null}
      </div>
    </Spin>
  );
};

export default Vidoe;
