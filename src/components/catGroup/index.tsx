/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-02 12:13:29
 * @Description:catGroup
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  list?: any | [];
  active: string;
  changeTag: (val: string) => void;
}

const CatGroup: FC<Props> = (props) => {
  const { list, active, changeTag } = props;
  console.log(list);
  return (
    <div className={styles.catGroup}>
      <div className={styles.all}>全部</div>
      {list.map((item: any, index: number) => {
        return (
          <div key={index} className={styles.alone}>
            <p>{item.title}</p>
            <ul>
              {item.children.map((child: any) => {
                const cls1 = child.name === active ? styles.active : '';
                const cls2 = child.hot ? styles.isHot : '';
                return (
                  <li key={child.name} className={[cls1].join(' ')}>
                    <span className={cls2} onClick={() => changeTag(child.name)}>
                      {child.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CatGroup;
