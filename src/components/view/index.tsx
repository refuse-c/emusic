/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 19:37:39
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-17 18:37:06
 * @Description:
 */
import { FC, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Layout } from 'antd';
import CustomHeader from '@components/header';
import { Scrollbars } from 'react-custom-scrollbars';
import { isArray } from '@utils/tools';
import { ResizableBox } from 'react-resizable';
const { Header, Footer, Sider, Content } = Layout;

interface Props {
  width?: number;
  children?: any;
  isFull?: boolean; // 是否展示全屏
  handleHasMore: Function;
}

const View: FC<Props> = (props) => {
  const scrollRef: any = useRef();
  // 滚动到底部改变状态触发事件
  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight === scrollHeight) {
      const { handleHasMore } = props;
      handleHasMore(true);
    }
  };

  useEffect(() => {
    console.log(scrollRef);
  });

  const { width = 200, children, isFull = false } = props;

  const onResize = (event: any, { element, size }: any) => {
    console.log(event, element, size);
  };

  return (
    <div className={styles.view}>
      <Layout>
        <Header>
          <CustomHeader />
        </Header>
        <Layout>
          {isArray(children) ? (
            <Sider width={width}>
              <ResizableBox
                width={200}
                height={500}
                minConstraints={[100, 100]}
                maxConstraints={[300, 300]}
                onResize={onResize}
              >
                <Scrollbars ref={scrollRef} className={styles.area}>
                  {props.children[0]}
                </Scrollbars>
              </ResizableBox>
            </Sider>
          ) : null}

          <Content>
            <Scrollbars className={styles.area} onScroll={handleScroll}>
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
