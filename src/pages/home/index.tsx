/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 22:22:22
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-08 14:13:10
 * @Description:
 */
import { FC, useContext } from 'react';
import styles from './index.module.scss';
import View from '@components/view';
import Menu from '@components/menu';
import { Context } from '@utils/context';
import PlayList from '@components/playList';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import router from '@/router/router';
const Home: FC = () => {
  const { showModal } = useContext(Context);
  return (
    <div className={styles.home}>
      {showModal === 'showPlayList' ? <PlayList /> : null}
      <View>
        <Menu />
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
      </View>
    </div>
  );
};

export default Home;
