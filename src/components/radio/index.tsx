/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-27 17:01:18
 * @Description:检索-电台组件
 */
import { formatImgSize } from '@/common/utils/format';
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  type?: string;
  list?: [] | any;
}

const Radio: FC<Props> = (props) => {
  const { list, type = 'row' } = props;
  const cls = type === 'row' ? styles.row : styles.col;
  return (
    <ul className={[styles.radio, cls].join(' ')}>
      {list.map((item: any, index: number) => {
        return (
          <li key={index}>
            <div className={styles.content}>
              <img src={formatImgSize(item.picUrl, 60, 60)} alt="" />
              <p>{item.name}</p>
            </div>
            <div className={styles.artist}>
              <span>by</span>
              {item.dj.nickname}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Radio;
