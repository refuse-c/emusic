/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-10 00:12:14
 * @Description:专辑
 */
import { formatImgSize } from '@/common/utils/format';
import { FC } from 'react';
import styles from './index.module.scss';
import { createHashHistory } from 'history';
const history = createHashHistory();
interface Props {
  layout?: string;
  list?: [] | any;
}

const Album: FC<Props> = (props) => {
  const { list, layout = 'row' } = props;
  const size = layout === 'row' ? 60 : 260;
  const status = layout === 'row';
  const cls = layout === 'row' ? styles.row : styles.col;

  return (
    <ul className={[styles.album, cls].join(' ')}>
      {list.map((item: any, index: number) => {
        const pathName = `/single${item.id}/${'专辑'}`;
        return (
          <li key={index} onClick={() => history.push(pathName)}>
            <div className={styles.content}>
              <img src={formatImgSize(item.picUrl, size, size)} alt="" />
              <p>{item.name}</p>
            </div>
            {status ? (
              <div className={styles.artist}>{item.artist.name}</div>
            ) : (
              <div className={styles.artist}>{item.name}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Album;
