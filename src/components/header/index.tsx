/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 21:46:11
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-10 15:58:16
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import { Input } from 'antd';
import { createHashHistory } from 'history';

const Header: FC = () => {
  const history = createHashHistory();
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.back_group}>
          <p className="icon icon-back" onClick={() => history.go(-1)}></p>
          <p className="icon icon-back" onClick={() => history.go(+1)}></p>
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
