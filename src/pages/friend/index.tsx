/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 22:56:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-17 19:10:19
 * @Description:朋友
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Title from '@components/title';
import { Button } from 'antd';
import Content from '@components/view/content';
const Friend: FC = () => {
  return (
    <Content isFull={true}>
      <div className={styles.friend}>
        <Title text="动态">
          <div className={styles.tools}>
            <Button>写动态</Button>
          </div>
        </Title>
        <Title iconText="歌单" text="我喜欢的音乐" />
        朋友
      </div>
    </Content>
  );
};
export default Friend;
