/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 22:56:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-15 00:46:23
 * @Description:朋友
 */
import { FC, useContext } from 'react';
import styles from './index.module.scss';
import Title from '@components/title';
import { Context } from '@utils/context';
import { Button } from 'antd';
const Friend: FC = () => {
  const { likeList, getLikeList } = useContext(Context);
  console.log(likeList);
  return (
    <div className={styles.friend}>
      <Title text="动态">
        <div className={styles.tools}>
          <Button onClick={() => getLikeList && getLikeList()}>写动态</Button>
        </div>
      </Title>
      <Title iconText="歌单" text="我喜欢的音乐" />
      朋友
    </div>
  );
};
export default Friend;
