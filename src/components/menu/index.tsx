/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 09:05:23
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-03 10:29:20
 * @Description:左侧菜单
 */
import { FC, useState, useContext } from 'react';
import styles from './index.module.scss';
import { menuList } from '@/common/utils/constant';
import { message } from 'antd';
import { Context } from '@utils/context';
import { createHashHistory } from 'history';

interface Item {
  type: number;
  name: string;
  isBold?: boolean;
  icon?: string;
}

const Menu: FC = () => {
  const history = createHashHistory();
  const [statue, setStatue] = useState(0);
  const { playList } = useContext(Context);

  /**
   * @name: 改变选中的项目的样式
   * @param {any} item
   * @param {number} index
   * @Description:
   */
  const handleMeun = (item: any, index: number) => {
    const { type, path } = item;

    if (type === 1) {
      setStatue(index);
      history.push(path);
    } else if (type === 3) {
      message.info('暂未开发');
    }
  };

  return (
    <ul className={styles.menu}>
      {menuList.concat(playList).map((item: Item, index: number) => {
        const { type, name, isBold, icon } = item;
        const cls1 = isBold ? null : styles.active1;
        const cls2 = statue === index ? styles.active2 : null;
        const cls3 = statue === index && isBold ? styles.active3 : null;
        const cls4 = type === 2 ? styles.active4 : styles.router;
        const cls5 = icon ? icon : '';
        const backgroundImage = icon ? `url(${icon}` : '';
        return (
          <li
            key={index}
            style={{ backgroundImage }}
            className={[cls1, cls2, cls3, cls4, cls5].join(' ')}
            onClick={() => handleMeun(item, index)}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
