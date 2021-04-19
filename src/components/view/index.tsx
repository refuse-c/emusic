/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 19:37:39
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-19 23:06:13
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import CustomHeader from '@components/header';
import { Scrollbars } from 'react-custom-scrollbars';
import { isArray } from '@utils/tools';
import 'react-resizable/css/styles.css';
const { Header, Footer, Sider, Content } = Layout;

interface Props {
  children?: any;
  isFull?: boolean; // 是否展示全屏
}

const View: FC<Props> = (props) => {
  const { children, isFull = false } = props;

  return (
    <div className={styles.view}>
      <Layout>
        <Header>
          <CustomHeader />
        </Header>
        <Layout>
          {isArray(children) ? (
            <Sider>
              <Scrollbars className={styles.area}>{props.children[0]}</Scrollbars>
            </Sider>
          ) : null}

          <Content>
            <Scrollbars className={styles.area}>
              <div className={isFull ? styles.isFull : styles.notFull}>
                {isArray(children) ? children[1] : children}
              </div>
            </Scrollbars>
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
};

export default View;
