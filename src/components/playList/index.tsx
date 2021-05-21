/*
 * @Author: REFUSE_C
 * @Date: 2021-05-21 16:27:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-21 17:59:13
 * @Description:播放列表
 */

import { FC, useState, useContext } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { playListNav } from '@/common/utils/local';
import EllipticalNav from '@components/ellipticalNav';

const Empty: FC = () => {
  const { songList } = useContext(Context);
  const [state, setstate] = useState(0);
  return (
    <div className={styles.playlist} onClick={(e) => e.stopPropagation()}>
      <div className={styles.content}>
        <EllipticalNav list={playListNav} status={state} onChange={(state: number) => setstate(state)} />
        {console.log(songList)}
      </div>
    </div>
  );
};

export default Empty;
