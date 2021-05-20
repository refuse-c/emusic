/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-20 09:34:13
 * @Description:播放全部
 */
import { FC } from 'react';
import styles from './index.module.scss';

const playAll: FC = () => {
  return (
    <div className={styles.playAll}>
      <div className={styles.play}>
        <p className="icon icon-play">播放全部</p>
        <p className="icon icon-add"></p>
      </div>
    </div>
  );
};

export default playAll;
