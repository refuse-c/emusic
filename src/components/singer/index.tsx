/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-25 14:22:51
 * @Description:歌手组件
 */
import { formatImgSize } from '@/common/utils/format';
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  type?: string;
  list?: [] | any;
}

const Singer: FC<Props> = (props) => {
  const { list, type = 'row' } = props;
  const cls = type === 'row' ? styles.row : styles.col;
  return (
    <ul className={[styles.singer, cls].join(' ')}>
      {list.map((item, index) => {
        return (
          <li key={index}>
            <div className={styles.content}>
              <img src={formatImgSize(item.img1v1Url, 60, 60)} alt="" />
              <p>{item.name}</p>
            </div>
            {item.accountId ? <div className={styles.accountId}>accountId</div> : null}
          </li>
        );
      })}
    </ul>
  );
};

export default Singer;