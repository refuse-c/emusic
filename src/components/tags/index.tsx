/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-28 23:16:09
 * @Description:标签
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  tag: string;
  list?: any;
  changeTag: any;
}
interface Item {
  name: string;
}
const Tags: FC<Props> = (props) => {
  const { tag, list, changeTag } = props;

  return (
    <div className={styles.tags}>
      <div className={styles.name}>
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
