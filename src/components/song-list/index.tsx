/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-22 23:09:58
 * @Description:歌单组件
 */
import { FC } from 'react';
import styles from './index.module.scss';
import { formatImgSize, formatNumber } from '@/common/utils/format';
import Playcount from '@/components/play-count';
import { jumpPage } from '@/common/utils/tools';

interface Props {
  list: any;
  layout?: string; // 是横着排还是竖着排默认值为row 可选值为col
  fixedNum?: boolean; // 是否固定个数
  pad?: boolean; // 自定义padding
}
interface Item {
  id: number;
  day?: number;
  name: string;
  trackCount: number;
  picUrl: string;
  coverImgUrl: string;
  playcount: number;
  playCount: number;
  subscribedCount: number;
  identifying?: boolean;
  creator: { nickname: string };
}

const SongList: FC<Props> = (props) => {
  const { list, layout = 'row', pad = false, fixedNum = false } = props;
  const status = layout === 'row';
  const size = layout === 'row' ? 260 : 60;
  const cls = layout === 'row' ? styles.row : styles.col;
  const itemCls = fixedNum ? styles.fixedNum : styles.item;
  const padding = layout === 'row' && pad ? '0 30px' : 0;
  return (
    <ul className={[styles.songList, cls].join(' ')} style={{ padding }}>
      {list.map((item: Item, index: number) => {
        const {
          day,
          name,
          picUrl,
          coverImgUrl,
          playcount,
          playCount,
          identifying,
          subscribedCount,
          creator,
          trackCount,
        } = item;
        const pathName = identifying ? '/recommendSong' : `/single${item.id}/${'歌单'}`;
        const src = identifying ? picUrl || coverImgUrl : formatImgSize(picUrl || coverImgUrl, size, size);
        return (
          <li key={index} className={itemCls}>
            <div className={styles.left} onClick={() => jumpPage(pathName)}>
              <img src={src} alt="" />
              {identifying ? (
                <div className={styles.dateBox}>{day}</div>
              ) : (
                status && <Playcount num={playcount || playCount} />
              )}
              <p className={styles.name}>{name}</p>
            </div>
            {!identifying && !status && (
              <ul className={styles.right}>
                <li>歌曲：{trackCount}</li>
                <li>by：{creator.nickname}</li>
                <li>收藏：{formatNumber(subscribedCount)}</li>
                <li>播放：{formatNumber(playcount || playCount)}</li>
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
