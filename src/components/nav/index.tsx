/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 03:26:00
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-12 01:04:32
 * @Description:导航
 */
import { FC, useState } from 'react';
import styles from './index.module.scss';

interface Props {
  list: any;
}

const Nav: FC<Props> = (props) => {
  const [statue, setStatue] = useState(0);
  const { list } = props;
  return (
    <ul className={styles.nav}>
      {list.map((item: any, index: number) => {
        const cls = statue === index ? styles.active : '';
        return (
          <li key={index} className={cls} onClick={() => setStatue(index)}>
            {item.name}
          </li>
        );
      })}
    </ul>
  );
};
export default Nav;
