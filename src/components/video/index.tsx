/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-05 14:06:59
 * @Description:视频列表组件
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Playcount from '@components/playcount';
import { formatImgSize } from '@/common/utils/format';
interface Props {
  list?: any;
  hideLst?: boolean;
  showTips?: boolean;
}
interface Item {
  id: string;
  title: string;
  coverUrl: string;
  playTime: number;
  copywriter?: string;
  creator?: any;
}
const Video: FC<Props> = (props) => {
  const { list } = props;
  return (
    <ul className={styles.video}>
      {list.map((item: Item, index: number) => {
        const { title, coverUrl, playTime, creator } = item;
        return (
          <li key={index}>
            <div className={styles.img_box} style={{ backgroundImage: `url(${formatImgSize(coverUrl, 334, 188)})` }}>
              <div className={styles.playCount_box}>
                <Playcount num={playTime} />
              </div>
            </div>
            <p className={styles.title}>{title}</p>
            <p className={styles.artistName}>by {creator[0].userName}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Video;
