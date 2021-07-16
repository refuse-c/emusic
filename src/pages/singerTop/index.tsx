/*
 * @Author: REFUSE_C
 * @Date: 2021-07-07 18:10:47
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 15:31:28
 * @Description:云音乐歌手榜
 */

import { FC, useState, useEffect } from 'react';
import styles from './index.module.scss';
import Title from '@components/title';
import Content from '@components/view/content';
import { toplistArtist } from '@/common/net/topList';
import SingerComponent from '@components/singer';
import Navigation from '@components/navigation';
import { singerTopNav } from '@/common/utils/local';
import moment from 'moment';
const SingerTop: FC = () => {
  const [type, setType] = useState(0);
  const [list, setList] = useState<any>({});

  // 歌手榜单
  const queryToplistArtist = async (type: number) => {
    const res: any = await toplistArtist({ type });
    if (res.code === 200) setList(res.list);
  };

  useEffect(() => {
    queryToplistArtist(type + 1);
  }, [type]);

  return (
    <div className={styles.singerTop}>
      <div className={styles.top}>
        <Title title="云音乐歌手榜"></Title>
        <Navigation status={type} list={singerTopNav} onChange={(_item: any, index: number) => setType(index)}>
          {!!list.updateTime && <div>更新时间：{moment(list.updateTime).format('MM月DD日')}</div>}
        </Navigation>
      </div>
      <Content padding={'0 0 30px'} isFull={true}>
        <SingerComponent list={list.artists || []} type={3} layout="row" />
      </Content>
    </div>
  );
};

export default SingerTop;
