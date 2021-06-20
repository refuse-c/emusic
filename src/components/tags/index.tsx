/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-17 02:36:53
 * @Description:标签
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  type?: string; // 是什么类型   视频 歌单
  tag: string;
  list?: any | [];
  changeTag: (val: { name: string }) => void;
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
            <li key={index} className={cls} onClick={() => changeTag(item)}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
