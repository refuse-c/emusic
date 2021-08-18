/*
 * @Author: REFUSE_C
 * @Date: 2021-07-30 14:49:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-18 11:47:38
 * @Description: 登录弹窗
 */

import { FC } from 'react';
import styles from './css/index.module.scss';
import BoxModel from '@components/model/BoxModel';
import Qrcode from '@pages/login/qrcode';

interface Props {
  hasShow?: boolean;
  onClose?: any;
  onFinish?: any;
}

const DragSort: FC<Props> = (props) => {
  const { hasShow, onClose } = props;
  return (
    <BoxModel hasShow={hasShow} onClose={onClose} width={350} height={530}>
      <div className={styles.login}>
        <Qrcode />
      </div>
    </BoxModel>
  );
};

export default DragSort;
