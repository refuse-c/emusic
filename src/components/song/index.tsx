/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-20 21:24:51
 * @Description:最新音乐组件
 */
import { renderArtists } from '@/common/utils/tools';

import { FC, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  list?: any;
}

interface Item {
  name: string;
  album: any;
  artists: any;
  transNames?: any;
}

const Songs: FC<Props> = (props) => {
  const [active, setActive] = useState(NaN);

  const { list } = props;
  console.log(list);

  return (
    <ul className={styles.list}>
      {list.map((item: Item, index: number) => {
        const { album, name, transNames = [], artists } = item;
        const cls = index === active ? styles.active : '';

        return (
          <li key={index} className={[styles.item, cls].join(' ')} onClick={() => setActive(index)}>
            <div className={styles.img} style={{ backgroundImage: `url(${album.picUrl})` }}></div>
            <div className={styles.info}>
              <p>
                {name}
                {transNames.length ? transNames[0] : null}
              </p>
              <p>{renderArtists(artists)}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Songs;
