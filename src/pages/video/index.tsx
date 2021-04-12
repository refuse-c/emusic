/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 22:56:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-13 00:34:39
 * @Description:视频
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Nav from '@components/nav';
import { videoNav } from '@/common/utils/local';

const Video: FC = () => {
  return (
    <div className={styles.video}>
      <Nav list={videoNav} />
    </div>
  );
};
export default Video;
