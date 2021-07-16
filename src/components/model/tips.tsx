/*
 * @Author: REFUSE_C
 * @Date: 2021-05-23 13:19:38
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-10 19:52:33
 * @Description:
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

const Index: FC<Props> = (props) => {
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

export default Index;
