/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-19 16:54:28
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

const SingleList: FC<Props> = (props) => {
  const { list } = props;
  return (
    <ul className={styles.singleList}>
      {list.map((item: Item, index: number) => {
        return (
          <li key={index}>
            <div className={styles.imgBox} style={{ backgroundImage: `url(${formatImgSize(item.picUrl, 210, 210)})` }}>
              {item.identifying ? (
                <div className={styles.dateBox}>{item.day}</div>
              ) : (
                <Playcount top={'1'} num={item.playcount} />
              )}
            </div>
            <p>{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SingleList;
