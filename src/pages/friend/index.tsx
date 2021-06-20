/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 22:56:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-18 01:01:07
 * @Description:朋友
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Title from '@components/title';
// import { Button } from 'antd';
import Content from '@components/view/content';
const Friend: FC = () => {
  return (
    <Content isFull={true}>
      <div className={styles.friend}>
        <Title title="动态"> </Title>
        <Title title="我喜欢的音乐" btn="写动态" />
        <Title title="我喜欢的音乐" path="/find/playlist" />
      </div>
    </Content>
  );
};
export default Friend;
