/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-14 23:43:16
 * @Description:轮播图
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  list: any;
}

const Banner: FC<Props> = (props) => {
  const { list } = props;

  return (
    <ul className={styles.banner}>
      {list.map((item: any, index: number) => {
        return <li key={index}>{<img src={item.imageUrl} alt="" />}</li>;
      })}
    </ul>
  );
};

export default Banner;
