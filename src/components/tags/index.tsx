/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-02 12:25:40
 * @Description:标签
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  tag: string;
  list?: any | [];
  changeTag: (val: string) => void;
  showCallBack: () => void;
}
interface Item {
  name: string;
}
const Tags: FC<Props> = (props) => {
  const { tag, list, changeTag, showCallBack } = props;

  return (
    <div className={styles.tags}>
      <div
        className={styles.name}
        onClick={(e) => {
          showCallBack();
          e.stopPropagation();
        }}
      >
        {tag} <span className="icon icon-arrow-left"></span>
      </div>
      <ul>
        {list.map((item: Item, index: number) => {
          const { name } = item;
          const cls = tag === name ? styles.active : '';
          return (
            <li key={index} className={cls} onClick={() => changeTag(name)}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
