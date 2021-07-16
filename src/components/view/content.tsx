/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 19:37:39
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-01 23:51:32
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';
import 'react-resizable/css/styles.css';

interface Props {
  children?: any;
  maxWidth?: any;
  padding?: number | string;
  isFull?: boolean;
}

const View: FC<Props> = (props) => {
  const { children, padding = '0 30px', isFull = false, maxWidth = null } = props;

  return (
    <div style={{ padding, maxWidth }} className={isFull ? styles.isFull : styles.notFull}>
      {children}
    </div>
  );
};

export default View;
