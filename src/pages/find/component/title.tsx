/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 23:04:42
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-22 23:56:21
 * @Description:发现音乐-标题
 */

import { FC } from 'react';
import styles from '../index.module.scss';
import { createHashHistory } from 'history';
interface Props {
  top?: number;
  title: string;
  pathName?: any;
}

const Recommend: FC<Props> = (props) => {
  const { top, title, pathName } = props;
  const history = createHashHistory();
  return (
    <div style={{ marginTop: top }} className={styles.findTitle} onClick={() => history.push(pathName)}>
      <span>{title}</span>
    </div>
  );
};

export default Recommend;
