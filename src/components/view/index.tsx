/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 19:37:39
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-17 19:23:49
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import CustomHeader from '@components/header';
import Control from '@/pages/control';
import { isArray } from '@utils/tools';
import 'react-resizable/css/styles.css';
const { Header, Footer, Sider, Content } = Layout;

interface Props {
  children?: any;
  isFull?: boolean; // 是否展示全屏
}

const View: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className={styles.view}>
      <Layout>
        <Header>
          <CustomHeader />
        </Header>
        <Layout>
          {isArray(children) ? <Sider>{props.children[0]}</Sider> : null}
          <Content id="content">{isArray(children) ? children[1] : children}</Content>
        </Layout>
        <Footer>
          <Control />
        </Footer>
      </Layout>
    </div>
  );
};

export default View;
