/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 19:37:39
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-11 14:39:57
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import CustomHeader from '@components/header';
import { Scrollbars } from 'react-custom-scrollbars';
import { isArray } from '@utils/tools';
const { Header, Footer, Sider, Content } = Layout;

interface Props {
  width?: number;
  children?: any;
}

const View: FC<Props> = (props) => {
  const { width = 200, children } = props;

  return (
    <div className={styles.view}>
      <Layout>
        <Header>
          <CustomHeader />
        </Header>
        <Layout>
          {isArray(children) ? (
            <Sider width={width}>
              <Scrollbars className={styles.area}>{props.children[0]}</Scrollbars>
            </Sider>
          ) : null}

          <Content>
            <Scrollbars className={styles.area}>{isArray(children) ? children[1] : children}</Scrollbars>
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
};

export default View;
