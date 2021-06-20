/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-17 16:52:07
 * @Description:视频列表组件
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Playcount from '@components/playcount';
import { formatImgSize } from '@/common/utils/format';
interface Props {
  type?: number; // 渲染那个页面  默认为0  0 检索页  1 视频页
  list?: any; // 需要渲染的列表
}
interface Item {
  id: string;
  title: string;
  coverUrl: string;
  playTime: number;
  copywriter?: string;
  creator?: any;
  data?: any;
}
const Video: FC<Props> = (props) => {
  const { list, type = 0 } = props;
  return (
    <ul className={styles.video}>
      {list
        .filter((child: { type: number }) => child.type !== 7) // 过滤直播数据
        .map((item: Item, index: number) => {
          const { title, coverUrl, playTime, creator, data } = item;
          const name = type === 1 ? data.title : title; // 标题
          const playcount = type === 1 ? data.playTime : playTime; // 播放量
          const backgroundImage = `url(${formatImgSize(type === 1 ? data.coverUrl : coverUrl, 334, 188)})`; // 背景图
          const artistName = type === 1 ? data && data.creator && data.creator.nickname : creator[0].userName; // 作者

          return (
            <li key={index}>
              <div className={styles.img_box} style={{ backgroundImage }}>
                <div className={styles.playCount_box}>
                  <Playcount num={playcount} />
                </div>
              </div>
              <p className={styles.title}>{name}</p>
              <p className={styles.artistName}>by {artistName}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default Video;
