/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-19 23:14:45
 * @Description:最新音乐组件
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  title?: string;
}

const Empty: FC<Props> = (props) => {
  const { title } = props;
  return <div className={styles.empty}>{title}</div>;
};

export default Empty;
