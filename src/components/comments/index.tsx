/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-14 00:14:55
 * @Description:评论
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  title?: string;
}

const Comments: FC<Props> = (props) => {
  const { title } = props;
  return <div className={styles.comments}>{title}评论</div>;
};

export default Comments;
