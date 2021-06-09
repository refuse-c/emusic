/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-09 18:57:16
 * @Description:歌手-顶部tag
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  cb: (key: string) => void;
  title?: string;
  list: any;
  width?: number;
  active: string;
}

const SingTag: FC<Props> = (props) => {
  const { title, list, width = 56, active, cb } = props;
  console.log(cb);
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
