/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 09:05:23
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-11 14:39:30
 * @Description:
 */
import { FC, useState } from 'react';
import styles from './index.module.scss';
import { menuList } from '@utils/local';
import { message } from 'antd';

const Menu: FC = () => {
  const [statue, setStatue] = useState(0);
  /**
   * @name: 改变选中的项目的样式
   * @param {number} index
   * @param {any} setStatue
   * @Description:
   */
  const handleMeun = (index: number, type: number, setStatue: any) =>
    type === 1 ? setStatue(index) : type === 3 ? message.info('暂未开发') : null;

  return (
    <ul className={styles.menu}>
      {menuList.map((item: any, index: number) => {
        const { type, name, isBold } = item;
        const cls1 = isBold ? null : styles.active1;
        const cls2 = statue === index ? styles.active2 : null;
        const cls3 = statue === index && isBold ? styles.active3 : null;
        const cls4 = type === 2 ? styles.directory : styles.router;
        return (
          <li
            key={index}
            className={[cls1, cls2, cls3, cls4].join(' ')}
            onClick={() => handleMeun(index, type, setStatue)}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
};
export default Menu;
