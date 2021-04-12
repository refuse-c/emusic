/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 12:00:00
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-12 22:34:29
 * @Description:
 */
/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 11:59:45
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-12 21:39:02
 * @Description:发现音乐
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Nav from '@components/nav';

import { HashRouter as Router, Route } from 'react-router-dom';
import { findNav } from '@utils/local';

const Find: FC = (props: any) => {
  const { router } = props;
  return (
    <div className={styles.find}>
      <Nav list={findNav} />
      <div>
        <Router>
          {router.map((item: any, index: number) => (
            <Route
              exact
              key={index}
              path={item.path}
              render={(props) => <item.component {...props} router={item.router} />}
            />
          ))}
        </Router>
      </div>
    </div>
  );
};
export default Find;
