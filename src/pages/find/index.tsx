/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 11:59:45
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-17 18:53:54
 * @Description:发现音乐
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Nav from '@components/nav';

import { HashRouter as Router, Route } from 'react-router-dom';
import { findNav } from '@utils/local';

const Find: FC = (props: any) => {
  const { router, hasMore, handleHasMore } = props;
  return (
    <div className={styles.find}>
      <Nav list={findNav} isFixed={true} />
      <Router>
        {router.map((item: any, index: number) => (
          <Route
            exact
            key={index}
            path={item.path}
            render={(props) => (
              <item.component {...props} hasMore={hasMore} handleHasMore={handleHasMore} router={item.router} />
            )}
          />
        ))}
      </Router>
    </div>
  );
};
export default Find;
