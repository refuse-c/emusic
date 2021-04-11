/*
 * @Author: REFUSE_C
 * @Date: 2021-04-07 23:41:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-11 14:43:19
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Home from '@pages/home';
const App: FC = () => {
  return (
    <div className={styles.app}>
      <Home />
    </div>
  );
};

export default App;
