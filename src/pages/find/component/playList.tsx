/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 20:53:40
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-27 22:42:14
 * @Description:歌单
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import { playlistTag } from '@/common/net/playList';

const Recommend: FC = () => {
  const [tagList, setTagList] = useState([]);
  const getPlaylistTag = async () => {
    const result = await playlistTag();
    setTagList(tagList);
    console.log(result);
  };

  useEffect(() => {
    getPlaylistTag();
  });

  return <div className={styles.recommend}>歌单</div>;
};

export default Recommend;
