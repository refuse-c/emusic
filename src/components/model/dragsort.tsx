/*
 * @Author: REFUSE_C
 * @Date: 2021-08-13 22:37:31
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-14 16:57:15
 * @Description:调整栏目顺序
 */
import { FC } from 'react';
import styles from './css/index.module.scss';
import BoxModel from '@components/model/BoxModel';
import { Drag } from 'mys-react';
interface Props {
  msg: string;
  list: [];
  title: string;
  hasShow: boolean;
  setArray: any;
  onClose: any;
}

const DragSort: FC<Props> = (props) => {
  const { msg, list, title, hasShow, setArray, onClose } = props;
  return (
    <BoxModel hasShow={hasShow} onClose={onClose} title={title} width={400}>
      <div className={styles.dragsort}>
        {<p className={styles.msg}>{msg}</p>}
        <Drag list={list} onChange={(newList) => setArray(newList)}>
          {list.map((item: { title: string }, index) => {
            return (
              <div className={styles.item} key={index}>
                <p>{item.title}</p>
                <p className="icon icon-enabled"></p>
              </div>
            );
          })}
        </Drag>
      </div>
    </BoxModel>
  );
};

export default DragSort;
