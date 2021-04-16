/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-16 14:14:35
 * @Description:歌单组件
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  list: any;
}
interface Item {
  name: string;
  picUrl: string;
}

const SingleList: FC<Props> = (props) => {
  const { list } = props;
  console.log(list);
  return (
    <ul className={styles.singleList}>
      {list.map((item: Item, index: number) => {
        return (
          <li key={index}>
            <div style={{ backgroundImage: `url(${item.picUrl})` }}></div>
            <p>{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SingleList;
