/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 22:56:05
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-16 12:59:37
 * @Description:视频
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Nav from '@components/nav';
import { videoNav } from '@/common/utils/constant';
import Content from '@components/view/content';
import { HashRouter as Router, Route } from 'react-router-dom';
const Video: FC = (props: any) => {
  const { router } = props;
  return (
    <div className={styles.video}>
      <Content isFull={true}>
        <Nav list={videoNav} />
      </Content>
      <Content padding={'0 30px'} isFull={false}>
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
      </Content>
    </div>
  );
};
export default Video;
