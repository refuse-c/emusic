/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-17 20:42:44
 * @Description:等待层
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  title?: string;
}

const Loading: FC<Props> = (props) => {
  const { title = 'Loading...' } = props;
  return (
    <div className={styles.loading}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <p> {title}</p>
    </div>
  );
};

export default Loading;
