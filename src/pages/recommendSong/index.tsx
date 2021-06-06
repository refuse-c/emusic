/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-06 18:39:28
 * @Description:空组件
 */
import { FC, useEffect, useState } from 'react';
import Content from '@components/view/content';
import styles from './index.module.scss';
import PlayAll from '@components/playAll';
import { recommendSong } from '@/common/net/find';
import MusicList from '@components/musicList';
import moment from 'moment';
const RecommendSong: FC = () => {
  const [dailySongs, setDdailySongs] = useState([]);
  const getRecommendSong = async () => {
    const res: any = await recommendSong();
    const dailySongs = res.data.dailySongs;
    setDdailySongs(dailySongs);
  };

  useEffect(() => {
    getRecommendSong();
  }, []);

  return (
    <div className={styles.recommendSong}>
      <div id="head">
        <Content padding={'30px 30px 10px'} isFull={true}>
          <div className={styles.head}>
            <div className={styles.time}>
              <span>{moment().locale('zh-cn').format('DD')}</span>
            </div>
            <div className={styles.info}>
              <p>每日歌曲推荐</p>
              <p>根据您的音乐口味生成，每天6:00更新</p>
            </div>
          </div>
          <PlayAll list={dailySongs} />
        </Content>
      </div>
      <div style={{ borderTop: '1px solid #E5E5E5' }}>
        <MusicList list={dailySongs} />
      </div>
    </div>
  );
};

export default RecommendSong;
