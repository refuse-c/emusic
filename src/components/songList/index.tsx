/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-23 14:44:35
 * @Description:歌单组件
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Playcount from '@components/playcount';
import { formatImgSize } from '@/common/utils/format';
import { createHashHistory } from 'history';
const history = createHashHistory();
interface Props {
  list: any;
}
interface Item {
  id: number;
  day?: number;
  name: string;
  picUrl: string;
  coverImgUrl: string;
  playcount: number;
  playCount: number;
  identifying?: boolean;
}

const SongList: FC<Props> = (props) => {
  const { list } = props;
  return (
    <ul className={styles.songList}>
      {list.map((item: Item, index: number) => {
        const { day, name, picUrl, coverImgUrl, playcount, playCount, identifying } = item;
        const pathName = identifying ? '/recommendSong' : `/single${item.id}/${'歌单'}`;
        return (
          <li key={index}>
            <div
              onClick={() => history.push(pathName)}
              className={styles.imgBox}
              style={{
                backgroundImage: `url(${
                  identifying ? picUrl || coverImgUrl : formatImgSize(picUrl || coverImgUrl, 210, 210)
                })`,
              }}
            >
              {identifying ? <div className={styles.dateBox}>{day}</div> : <Playcount num={playcount || playCount} />}
            </div>
            <p>{name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SongList;
