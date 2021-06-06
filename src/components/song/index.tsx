/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-05 13:41:38
 * @Description:最新音乐组件
 */
import { formatImgSize } from '@/common/utils/format';
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

  return (
    <ul className={styles.list}>
      {list.map((item: Item, index: number) => {
        const { album, name, transNames = [], artists } = item;
        const cls = index === active ? styles.active : '';

        return (
          <li key={index} className={[styles.item, cls].join(' ')} onClick={() => setActive(index)}>
            <div
              className={styles.img}
              style={{ backgroundImage: `url(${formatImgSize(album.picUrl, 50, 50)})` }}
            ></div>
            <div className={styles.info}>
              <div>
                {name}
                {transNames.length ? transNames[0] : null}
              </div>
              <div>{renderArtists(artists)}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Songs;
