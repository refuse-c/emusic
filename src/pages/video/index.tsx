/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 22:56:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-17 19:12:11
 * @Description:视频
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Nav from '@components/nav';
import { videoNav } from '@/common/utils/local';
import Content from '@components/view/content';
const Video: FC = () => {
  return (
    <div className={styles.video}>
      <Content isFull={true}>
        <Nav list={videoNav} />
      </Content>
    </div>
  );
};
export default Video;
