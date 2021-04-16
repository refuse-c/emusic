/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-16 13:50:56
 * @Description:轮播图
 */
import { FC, useState, useEffect } from 'react';
import styles from './index.module.scss';
interface Props {
  list: any;
}
interface Item {
  imageUrl: string;
  typeTitle: string;
  titleColor: string;
}

const Banner: FC<Props> = (props) => {
  const { list } = props;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const newActive = active + 1 === list.length ? 0 : active + 1;
      setActive(newActive);
    }, 5000);
    return () => clearInterval(timer);
  }, [active, list.length]);

  return (
    <div className={styles.banner}>
      <ul className={styles.imgList}>
        {list.map((item: Item, index: number) => {
          const len = list.length - 1;
          const cls1 = index === active ? styles.active : '';
          const cls2 = index === (active === 0 ? len : active - 1) ? styles.active_left : '';
          const cls3 = index === (active === len ? 0 : active + 1) ? styles.active_right : '';
          const color = item.titleColor === 'red' ? '#CC4A4A' : '#4A79CC';
          return (
            <li key={item.imageUrl} className={[cls1, cls2, cls3].join(' ')} onClick={() => setActive(index)}>
              {<img src={item.imageUrl} alt="" />}
              <p style={{ backgroundColor: color }}>{item.typeTitle}</p>
            </li>
          );
        })}
        <div className={styles.arrow_prev}></div>
        <div className={styles.arrow_next}></div>
      </ul>
      <ul className={styles.pointList}>
        {list.map((item: Item, index: number) => {
          const cls = index === active ? styles.active : '';
          return <li key={item.imageUrl} className={cls} onMouseEnter={() => setActive(index)}></li>;
        })}
      </ul>
    </div>
  );
};

export default Banner;
