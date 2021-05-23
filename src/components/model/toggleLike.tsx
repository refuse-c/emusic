/*
 * @Author: REFUSE_C
 * @Date: 2021-05-23 13:19:38
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-23 14:11:21
 * @Description:
 */
import { FC, useContext } from 'react';
import styles from './css/index.module.scss';
import { Context } from '@utils/context';
import BoxModel from '@components/model/BoxModel';

interface Props {
  id: number | string;
  hasShow: boolean;
  onClose: any;
}

const Index: FC<Props> = (props) => {
  const { id, hasShow, onClose } = props;
  const { setLike } = useContext(Context);
  return (
    <BoxModel hasShow={hasShow} onClose={onClose}>
      <div className={styles.toggleLike}>
        <p>确定将选中歌曲从我喜欢的音乐中删除?</p>
        <p
          onClick={() => {
            setLike(id, false);
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
