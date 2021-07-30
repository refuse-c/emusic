/*
 * @Author: REFUSE_C
 * @Date: 2021-07-30 14:49:17
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-30 14:49:58
 * @Description: 拖拽排序
 */

import { FC } from 'react';
import styles from './css/index.module.scss';
import BoxModel from '@components/model/BoxModel';

interface Props {
  msg: string;
  hasShow: boolean;
  onClose: any;
  onFinish: any;
}

const DragSort: FC<Props> = (props) => {
  const { msg, hasShow, onClose, onFinish } = props;
  return (
    <BoxModel hasShow={hasShow} onClose={onClose}>
      <div className={styles.toggleLike}>
        <p>{msg}</p>
        <p
          onClick={() => {
            onFinish();
            onClose();
          }}
        >
          确定
        </p>
      </div>
    </BoxModel>
  );
};

export default DragSort;
