/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 03:26:00
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-13 22:34:25
 * @Description:导航
 */
import { FC } from 'react';
import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  list: any;
  isFixed?: boolean; // 滚动时是否吸顶
}

const Nav: FC<Props> = (props) => {
  const { list, isFixed = false } = props;
  const cls = isFixed ? styles.isFixed : '';
  return (
    <div className={[styles.nav, cls].join(' ')}>
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
