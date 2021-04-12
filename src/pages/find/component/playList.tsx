/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-12 22:54:17
 * @Description:歌单
 */
import { FC, useEffect } from 'react';
import styles from '../index.module.scss';
import { login } from '@/common/net/login';
import { recommendSong } from '@/common/net/find';

const Recommend: FC = () => {
  const getLogin = async () => {
    const result = await login({ phone: '13272946536', password: 'wangyi123@@' });
    console.log(result);
  };

  const getRecommendSong = async () => {
    const result = await recommendSong('');
    console.log(result);
  };

  useEffect(() => {
    console.log('歌单');
    getLogin();
    getRecommendSong();
  });

  return <div className={styles.recommend}>歌单</div>;
};

export default Recommend;
