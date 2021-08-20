/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-19 20:18:25
 * @Description:空组件
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  title?: string;
  setType: (v: number) => void;
}

const Empty: FC<Props> = (props) => {
  const { title, setType } = props;
  console.log(setType);
  return <div className={styles.empty}>{title}</div>;
};

export default Empty;
