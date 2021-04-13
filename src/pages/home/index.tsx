/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 22:22:22
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-13 22:08:19
 * @Description:
 */
import { FC, useState } from 'react';
import styles from './index.module.scss';
import View from '@components/view';
import Menu from '@components/menu';

import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import router from '@/router/router';
const Home: FC = () => {
  const [isFull, setIsFull] = useState(false);
  return (
    <div className={styles.home}>
      <View isFull={isFull}>
        <Menu callBack={(val) => setIsFull(val)} />
        <div className={styles.content}>
          <Router>
            {router.map((item: any, index: number) => (
              <Route
                key={index}
                path={item.path}
                render={(props) => <item.component {...props} router={item.router} />}
              />
            ))}
            <Redirect exact from="/" to="/find" />
          </Router>
        </div>
      </View>
    </div>
  );
};

export default Home;
