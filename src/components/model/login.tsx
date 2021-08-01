/*
 * @Author: REFUSE_C
 * @Date: 2021-07-30 14:49:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-30 21:09:19
 * @Description: 登录弹窗
 */

import { FC } from 'react';
import styles from './css/index.module.scss';
import BoxModel from '@components/model/BoxModel';

interface Props {
  hasShow?: boolean;
  onClose?: any;
  onFinish?: any;
}

const DragSort: FC<Props> = (props) => {
  const { hasShow, onClose } = props;
  return (
    <BoxModel hasShow={hasShow} onClose={onClose} width={350} height={530}>
      <div className={styles.login}></div>
    </BoxModel>
  );
};

export default DragSort;
