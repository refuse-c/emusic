/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-11 14:20:16
 * @Description:歌单导航
 */
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
  list: any | [];
  status: number;
  onChange: Function;
}
interface Item {
  title: string;
}

const Navigation: FC<Props> = (props) => {
  const { list, status, onChange } = props;
  return (
    <ul className={styles.navigation}>
      {list.map((item: Item, index: number) => {
        const cls = status === index ? styles.active : '';
        return (
          <li key={index} className={cls} onClick={() => onChange(item, index)}>
            {item.title}
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
