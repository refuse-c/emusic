/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 22:56:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-12 00:16:48
 * @Description:视频
 */
import { FC } from 'react';
// import styles from './index.moudle.scss';
import Nav from '@components/nav';
import { videoNav } from '@/common/utils/local';

const Video: FC = () => {
  return (
    <div>
      <Nav list={videoNav} />
    </div>
  );
};
export default Video;
