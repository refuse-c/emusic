/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 21:46:11
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-27 22:01:18
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import { Input } from 'antd';
const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.back_group}>
          <p className="icon icon-back"></p>
          <p className="icon icon-back"></p>
        </div>
        <div className={styles.search}>
          <Input placeholder="搜索" />
        </div>
        <div className={styles.general_song}>
          <p className="icon icon-general-song"></p>
        </div>
      </div>
      <ul className={styles.tool}>
        <li className={styles.author}></li>
        <li className="icon">
          REFUSE_C <span></span>
        </li>
        <li className="icon icon-theme"></li>
        <li className="icon icon-setting"></li>
        <li className="icon icon-email"></li>
        <li className="icon icon-min"></li>
        <li className="icon icon-minimize"></li>
        <li className="icon icon-amplification"></li>
        <li className="icon icon-close"></li>
      </ul>
    </div>
  );
};

export default Header;
