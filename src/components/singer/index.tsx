/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-12 01:30:39
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
      {list.map((item: any, index: number) => {
        return (
          <li key={index}>
            <div className={styles.content}>
              <img src={formatImgSize(item.img1v1Url, 180, 180)} alt="" />
            </div>
            <div className={styles.info}>
              <p>{item.name}</p>
              {item.accountId ? <div className={['icon icon-usersetting', styles.accountId].join(' ')}></div> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Singer;
