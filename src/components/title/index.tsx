/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 11:44:43
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-08 22:56:45
 * @Description:标题
 */
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
  text: string;
  iconText?: string;
  children?: any;
  margin?: string;
}

const Title: FC<Props> = (Props) => {
  const { text, iconText, children, margin = '21px 0' } = Props;
  return (
    <div className={styles.title} style={{ margin }}>
      {iconText ? <div className={styles.iconText}>{iconText}</div> : null}
      <div className={styles.text}>{text}</div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};
export default Title;
