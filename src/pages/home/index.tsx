/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 22:22:22
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-14 16:11:02
 * @Description:
 */
import { FC, useContext, Suspense } from 'react';
import styles from './index.module.scss';
import View from '@components/view';
import Menu from '@components/menu';
import { Context } from '@utils/context';
import PlayList from '@/components/play-list';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import router from '@/router/router';

const Home: FC = () => {
  const { showModal } = useContext(Context);
  return (
    <div className={styles.home}>
      {showModal === 'showPlayList' ? <PlayList /> : null}
      <View>
        <Menu />
        <Suspense fallback={''}>
          <Router>
            {router.map((item: any, index: number) => (
              <Route
                key={index}
                path={item.path}
                render={(props) => (
                  <item.component {...props} router={item.router} />
                )}
              />
            ))}
            {/* <Redirect exact from="/" to="/user81362209" /> */}
            {/* <Redirect exact from="/" to="/find/new" /> */}
            <Redirect exact from="/" to="/find" />
          </Router>
        </Suspense>
      </View>
    </div>
  );
};

export default Home;
