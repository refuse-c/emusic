/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 03:26:00
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-13 00:29:54
 * @Description:导航
 */
import { FC } from 'react';
import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  list: any;
}

const Nav: FC<Props> = (props) => {
  const { list } = props;
  return (
    <div className={styles.nav}>
      {list.map((item: any, index: number) => {
        return (
          <NavLink exact key={index} to={item.path} activeClassName={styles.active}>
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
};
export default Nav;
