/*
 * @Author: REFUSE_C
 * @Date: 2021-08-03 15:54:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-03 16:25:50
 * @Description:
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
