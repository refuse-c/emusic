/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 11:44:43
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-11 12:30:59
 * @Description:
 */
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
  iconText?: string;
  text?: string;
  children?: any;
}

const Title: FC<Props> = (Props) => {
  const { iconText, text, children } = Props;
  return (
    <div className={styles.title}>
      {iconText ? <div className={styles.iconText}>{iconText}</div> : null}
      <div className={styles.text}>{text}</div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};
export default Title;
