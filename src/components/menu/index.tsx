/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 09:05:23
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-13 22:07:54
 * @Description:左侧菜单
 */
import { FC, useState } from 'react';
import styles from './index.module.scss';
import { menuList } from '@utils/local';
import { message } from 'antd';
import { createHashHistory } from 'history';

interface Props {
  callBack: any;
}
const Menu: FC<Props> = (props) => {
  const history = createHashHistory();
  const [statue, setStatue] = useState(0);
  /**
   * @name: 改变选中的项目的样式
   * @param {any} item
   * @param {number} index
   * @Description:
   */
  const handleMeun = (item: any, index: number) => {
    const { callBack } = props;
    const { type, path, isFull } = item;
    if (type === 1) {
      setStatue(index);
      callBack(isFull);
      history.push(path);
    } else if (type === 3) {
      message.info('暂未开发');
    }
  };
  return (
    <ul className={styles.menu}>
      {menuList.map((item: any, index: number) => {
        const { type, name, isBold } = item;
        const cls1 = isBold ? null : styles.active1;
        const cls2 = statue === index ? styles.active2 : null;
        const cls3 = statue === index && isBold ? styles.active3 : null;
        const cls4 = type === 2 ? styles.directory : styles.router;
        return (
          <li key={index} className={[cls1, cls2, cls3, cls4].join(' ')} onClick={() => handleMeun(item, index)}>
            {name}
          </li>
        );
      })}
    </ul>
  );
};
export default Menu;
