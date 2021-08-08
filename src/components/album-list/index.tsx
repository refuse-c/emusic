/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-08 21:12:29
 * @Description:专辑
 */
import { formatImgSize } from '@/common/utils/format';
import { jumpPage } from '@/common/utils/tools';
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  min?: boolean; // 控制最少显示几个 true:4个  false:5个
  layout?: string;
  list?: [] | any;
}

const Album: FC<Props> = (props) => {
  const { list, layout = 'row', min = false } = props;
  const size = layout === 'row' ? 60 : 260;
  const status = layout === 'row';
  const cls = layout === 'row' ? styles.row : styles.col;
  const itemCls = layout === 'col' && min ? styles.itemMin : styles.itemMax;

  return (
    <ul className={[styles.album, cls].join(' ')}>
      {list.map((item: any, index: number) => {
        const pathName = `/single${item.id}/专辑`;
        return (
          <li
            key={index}
            className={itemCls}
            onClick={() => jumpPage(pathName)}
          >
            <div className={styles.content}>
              <img src={formatImgSize(item.picUrl, size, size)} alt="" />
              {status && <p>{item.name}</p>}
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
