/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-19 16:38:44
 * @Description:空组件
 */
import { FC } from 'react';
import Content from '@components/view/content';
import styles from './index.module.scss';

const RecommendSong: FC = () => {
  return (
    <div className={styles.recommendSong}>
      <Content></Content>
    </div>
  );
};

export default RecommendSong;
