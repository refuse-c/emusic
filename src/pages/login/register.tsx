/*
 * @Author: REFUSE_C
 * @Date: 2021-08-18 11:33:18
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-21 23:46:27
 * @Description:
 */

import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  title?: string;
}

const Register: FC<Props> = (props) => {
  const { title } = props;
  return <div className={styles.register}>{title}</div>;
};

export default Register;
