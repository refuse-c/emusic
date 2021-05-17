/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 22:22:22
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-17 19:43:29
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import View from '@components/view';
import Menu from '@components/menu';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import router from '@/router/router';
const Home: FC = () => {
  return (
    <div className={styles.home}>
      <View>
        <Menu />
        <div className={styles.content}>
          <Router>
            {router.map((item: any, index: number) => (
              <Route
                key={index}
                path={item.path}
                render={(props) => <item.component {...props} router={item.router} />}
              />
            ))}
            <Redirect exact from="/" to="/single5312444463" />
          </Router>
        </div>
      </View>
    </div>
  );
};

export default Home;
