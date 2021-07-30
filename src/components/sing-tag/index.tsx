/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-09 21:43:42
 * @Description:歌手-顶部tag
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  list: any;
  title: string;
  width?: number;
  active: string;
  cb: (key: string) => void;
}

const SingTag: FC<Props> = (props) => {
  const { title, list, width = 56, active, cb } = props;
  return (
    <div className={styles.singTag}>
      <div className={styles.title}>{title}：</div>
      <ul>
        {list.map((item: any, index: number) => {
          const cls = item.key === active ? styles.active : '';
          return (
            <li key={index} style={{ width }} className={cls} onClick={() => cb(item.key)}>
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SingTag;
