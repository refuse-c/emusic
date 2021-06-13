/*
 * @Author: REFUSE_C
 * @Date: 2021-05-23 13:19:38
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-13 11:48:12
 * @Description:
 */
import { FC } from 'react';
import styles from './css/index.module.scss';
import BoxModel from '@components/model/BoxModel';

interface Props {
  hasShow: boolean;
  onClose: any;
  onFinish: any;
}

const Index: FC<Props> = (props) => {
  const { hasShow, onClose, onFinish } = props;
  return (
    <BoxModel hasShow={hasShow} onClose={onClose}>
      <div className={styles.toggleLike}>
        <p>确定将选中歌曲从我喜欢的音乐中删除?</p>
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
