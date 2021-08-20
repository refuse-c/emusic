/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 11:59:45
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 15:54:49
 * @Description:发现音乐
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Nav from '@components/nav';
import Content from '@components/view/content';
import { HashRouter as Router, Route } from 'react-router-dom';
import { findNav } from '@/common/utils/constant';

const Find: FC = (props: any) => {
  const { router } = props;
  return (
    <div className={styles.find}>
      <Content padding={'0 30px'} isFull={true}>
        <Nav list={findNav} isFixed={true} />
      </Content>

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
  );
};
export default Find;
