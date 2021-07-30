/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-05 13:47:34
 * @Description:推荐电台列表组件
 */
import { formatImgSize } from '@/common/utils/format';
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  list?: any;
}
interface Item {
  name: string;
  picUrl: string;
  rcmdText: string;
}
const RadioList: FC<Props> = (props) => {
  const { list } = props;
  return (
    <ul className={styles.list}>
      {list.map((item: Item, index: number) => {
        const { name, picUrl, rcmdText } = item;
        return (
          <li key={index}>
            <div className={styles.img_box} style={{ backgroundImage: `url(${formatImgSize(picUrl, 100, 100)})` }}>
              <p className={styles.name}>{name}</p>
            </div>
            <p className={styles.rcmdText}>{rcmdText}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default RadioList;
