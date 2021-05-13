/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-14 00:14:29
 * @Description:收藏者
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  title?: string;
}

const Collectors: FC<Props> = (props) => {
  const { title } = props;
  return <div className={styles.collectors}>{title}收藏者</div>;
};

export default Collectors;
