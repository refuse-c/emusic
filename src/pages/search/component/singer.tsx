/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-25 12:46:49
 * @Description:搜索-歌手
 */

import { FC, useEffect, useState, useContext } from 'react';
import styles from '../index.module.scss';
import { Context } from '@utils/context';
import { search } from '@/common/net/search';
import SingerComponent from '@components/singer';
import Content from '@components/view/content';
const Singer: FC = () => {
  const [list, setList] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const { searchText: keywords } = useContext(Context);

  // 检索
  const getSearch = async (keywords: string) => {
    setList([]);
    setloading(true);
    const res: any = await search({ keywords, limit: 100, type: 100 });
    const list = res.result.artists;
    setList(list);
  };

  useEffect(() => {
    getSearch(keywords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  return (
    <div className={styles.singer}>
      <Content padding={0}>
        <SingerComponent list={list} />
      </Content>
      {console.log(loading)}
    </div>
  );
};

export default Singer;
