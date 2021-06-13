/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-13 10:12:29
 * @Description:空组件
 */
import { FC, useEffect, useState } from 'react';
import Content from '@components/view/content';
import styles from './index.module.scss';
import PlayAll from '@components/playAll';
import MusicList from '@components/musicList';
import Navigation from '@components/navigation';
import moment from 'moment';
import { Spin } from 'antd';
import { historyRecommendSong, historyRecommendSongDetail, recommendSong } from '@/common/net/find';

const RecommendSong: FC = () => {
  const [loading, setLoading] = useState(false);
  const [historyInfo, setHistoryInfo] = useState([]);
  const [dailySongs, setDdailySongs] = useState([]);
  const [navStatus, setNavStatus] = useState(0);

  // 获取推荐歌曲
  const getRecommendSong = async () => {
    setLoading(true);
    const res: any = await recommendSong();
    if (res.code === 200) {
      const dailySongs = res.data.dailySongs;
      setDdailySongs(dailySongs);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // 获取历史时间
  const getHistoryRecommendSong = async () => {
    const res: any = await historyRecommendSong();
    if (res.code === 200) {
      let array: any = [];
      const dates = res.data.dates || [];
      dates.unshift(moment().format('YYYY-MM-DD'));
      dates.forEach((item: string) => {
        const today = moment().format('YYYY-MM-DD');
        const obj = { title: item === today ? '今天' : moment(item).format('MM-DD'), key: item };
        array.push(obj);
      });
      setHistoryInfo(array);
    }
  };

  // 获取历史推荐歌曲
  const getHistoryRecommendSongDetail = async (date: string) => {
    setLoading(true);
    const res: any = await historyRecommendSongDetail({ date });
    if (res.code === 200) {
      const dailySongs = res.data.songs;
      setDdailySongs(dailySongs);
      setLoading(false);
    }
  };

  const handleNav = (item: { title: string; key: string }, index: number) => {
    setNavStatus(index);
    item.title === '今天' ? getRecommendSong() : getHistoryRecommendSongDetail(item.key);
  };

  useEffect(() => {
    getRecommendSong();
    getHistoryRecommendSong();
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
          <div className={styles.tools}>
            <PlayAll list={dailySongs} />
            {historyInfo.length > 3 && (
              <Navigation
                list={historyInfo}
                status={navStatus}
                onChange={(item: any, index: number) => handleNav(item, index)}
              />
            )}
          </div>
        </Content>
      </div>
      <Spin spinning={loading}>
        <div style={{ borderTop: '1px solid #E5E5E5' }}>
          <MusicList list={dailySongs} />
        </div>
      </Spin>
    </div>
  );
};

export default RecommendSong;
