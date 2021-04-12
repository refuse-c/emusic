/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 23:04:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-13 00:25:00
 * @Description:发现音乐-标题
 */

import { FC } from 'react';
import styles from '../index.module.scss';
import { createHashHistory } from 'history';
interface Props {
  title: string;
  pathName?: any;
}

const Recommend: FC<Props> = (props) => {
  const { title, pathName } = props;
  const history = createHashHistory();
  return (
    <div className={styles.findTitle} onClick={() => history.push(pathName)}>
      <span>{title}</span>
    </div>
  );
};

export default Recommend;
