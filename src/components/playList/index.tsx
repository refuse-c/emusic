/*
 * @Author: REFUSE_C
 * @Date: 2021-05-21 16:27:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-21 20:26:48
 * @Description:播放列表
 */

import { FC, useState, useContext } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { playListNav } from '@/common/utils/local';
import EllipticalNav from '@components/ellipticalNav';
const PlayList: FC = () => {
  const { songList } = useContext(Context);
  const [state, setstate] = useState(0);
  return (
    <div className={styles.playlist} onClick={(e) => e.stopPropagation()}>
      <div className={styles.content}>
        <EllipticalNav list={playListNav} status={state} onChange={(state: number) => setstate(state)} />
        <div className={styles.tools}>
          <div className={styles.total}>{`总${songList.length}首`}</div>
          <div className={styles.info}>清空</div>
        </div>
        <ul className={styles.listbox}>
          {songList.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          })}
        </ul>
      </div>
      {console.log(songList)}
    </div>
  );
};

export default PlayList;
