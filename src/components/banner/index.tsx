/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-15 13:32:46
 * @Description:轮播图
 */
import { FC, useState, useEffect } from 'react';
import styles from './index.module.scss';
interface Props {
  list: any;
}

const Banner: FC<Props> = (props) => {
  const { list } = props;
  const [active, setActive] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      const newActive = active + 1 === list.length ? 0 : active + 1;
      setActive(newActive);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <ul className={styles.banner}>
      {list.map((item: any, index: number) => {
        const len = list.length;
        const cls1 = index === active ? styles.active : '';
        const cls2 = index === (active - 1 === 0 ? len : active - 1) ? styles.active_left : '';
        const cls3 = index === (active + 1 === len ? 0 : active + 1) ? styles.active_right : '';
        return (
          <li key={index} className={[cls1, cls2, cls3].join(' ')} onClick={() => setActive(index)}>
            {<img src={item.imageUrl} alt="" />}
          </li>
        );
      })}
    </ul>
  );
};

export default Banner;
