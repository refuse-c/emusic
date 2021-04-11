/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 22:22:22
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-11 14:40:42
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import View from '@components/view';
import Menu from '@components/menu';
import Find from '@pages/find';
const Home: FC = () => {
  return (
    <div className={styles.home}>
      <View>
        <Menu />
        <div>
          <Find />
        </div>
      </View>
    </div>
  );
};

export default Home;
