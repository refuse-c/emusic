/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-23 00:21:43
 * @Description:歌单组件
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Playcount from '@components/playcount';
import { formatImgSize } from '@/common/utils/format';
interface Props {
  list: any;
}
interface Item {
  day?: number;
  name: string;
  picUrl: string;
  playcount: number;
  identifying?: boolean;
}

const PlayList: FC<Props> = (props) => {
  const { list } = props;
  return (
    <ul className={styles.playlist}>
      {list.map((item: Item, index: number) => {
        const { day, name, picUrl, playcount, identifying } = item;
        return (
          <li key={index}>
            <div className={styles.imgBox} style={{ backgroundImage: `url(${formatImgSize(picUrl, 210, 210)})` }}>
              {identifying ? <div className={styles.dateBox}>{day}</div> : <Playcount top={'1'} num={playcount} />}
            </div>
            <p>{name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PlayList;
