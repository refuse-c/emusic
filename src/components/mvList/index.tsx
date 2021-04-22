/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-22 21:31:53
 * @Description:mv组件列表
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Playcount from '@components/playcount';
interface Props {
  list?: any;
  hideLst?: boolean;
  showTips?: boolean;
}
interface Item {
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
  copywriter?: string;
  artistName?: string;
}
const mvList: FC<Props> = (props) => {
  const { list, hideLst, showTips } = props;
  return (
    <ul className={styles.mvList}>
      {list.map((item: Item, index: number) => {
        const { name, picUrl, playCount, copywriter, artistName } = item;
        const cls = hideLst ? styles.hideLst : '';
        return (
          <li key={index} className={cls}>
            <div className={styles.img_box} style={{ backgroundImage: `url(${picUrl})` }}>
              <div className={styles.playCount_box}>
                <Playcount num={playCount} />
              </div>
            </div>
            <p className={styles.name}>{name}</p>
            <p className={styles.artistName}>{artistName}</p>
            {showTips ? <div className={styles.copywriter}>{copywriter}</div> : ''}
          </li>
        );
      })}
    </ul>
  );
};

export default mvList;
