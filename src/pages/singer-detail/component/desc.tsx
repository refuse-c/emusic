/*
 * @Author: REFUSE_C
 * @Date: 2021-07-09 16:10:28
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 16:19:50
 * @Description:
 */
import { FC } from 'react';
import styles from '../index.module.scss';
import ReactMarkdown from 'react-markdown';
import Content from '@components/view/content';
interface Props {
  text?: string;
}

const Empty: FC<Props> = (props) => {
  const { text } = props;
  return (
    <Content padding={'0 30px 30px'} isFull={true}>
      <div className={styles.desc}>{!!text ? <ReactMarkdown remarkPlugins={[]} children={text} /> : '暂无介绍'}</div>
    </Content>
  );
};

export default Empty;
