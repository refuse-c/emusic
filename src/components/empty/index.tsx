/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-07 21:15:51
 * @Description:空组件
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
