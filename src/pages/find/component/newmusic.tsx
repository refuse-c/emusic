/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 15:55:01
 * @Description:发现音乐-最新音乐
 */
import { FC } from 'react';
import styles from '../index.module.scss';
import Content from '@components/view/content';
const Newmusic: FC = () => {
  return (
    <div className={styles.newmusic}>
      <Content padding={'0 30px 30px'} isFull={false}>
        最新音乐
      </Content>
    </div>
  );
};

export default Newmusic;
