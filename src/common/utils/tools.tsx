/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-20 21:18:58
 * @Description:
 */

/** 是否是数组
 * @name:
 * @param {*} arr
 */
import styles from '@common/css/index.module.scss';

export const isArray = (arr: []) => {
  return arr instanceof Array;
};

/** 加载歌手名字
 * @name:
 * @param {*} arr
 */
interface Item {
  name: string;
}
export const renderArtists = (arr: []) => {
  return (
    <ul className={styles.artists}>
      {arr.map((item: Item, index: number) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
};
