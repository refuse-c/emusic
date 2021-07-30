/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 22:56:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-28 23:53:28
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
        <Title title="动态" btn="写动态" />
      </div>
    </Content>
  );
};
export default Friend;
