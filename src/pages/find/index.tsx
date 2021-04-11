/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 11:59:45
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-11 14:40:31
 * @Description:
 */
import { FC } from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import Nav from '@components/nav';
import Title from '@components/title';
import { findNav } from '@utils/local';
const Find: FC = () => {
  return (
    <div className={styles.find}>
      <Nav list={findNav} />
      <Title text="发现音乐" />
      <Title iconText="歌单" text="我喜欢的音乐" />
      <Title text="本地音乐">
        <div className={styles.tools}>
          <div>共644首，含296首VIP歌曲，您已享特权</div>
          <Button className={styles.btn}>选择目录</Button>
        </div>
      </Title>
    </div>
  );
};
export default Find;
