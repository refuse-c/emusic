/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-29 10:19:43
 * @Description:用户列表
 */
import { formatImgSize } from '@/common/utils/format';
import { jumpPage } from '@/common/utils/tools';
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  type?: string;
  list?: [] | any;
}

const User: FC<Props> = (props) => {
  const { list, type = 'row' } = props;
  const cls = type === 'row' ? styles.row : styles.col;
  return (
    <ul className={[styles.user, cls].join(' ')}>
      {list.map((item: any, index: number) => {
        return (
          <li key={index} onClick={() => jumpPage(`/user${item.userId}`)}>
            <div className={styles.content}>
              <img src={formatImgSize(item.avatarUrl, 60, 60)} alt="" />
              <p>{item.nickname}</p>
            </div>
            <div className={styles.artist}>{item.description || item.signature}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default User;
