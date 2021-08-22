/*
 * @Author: REFUSE_C
 * @Date: 2021-04-11 11:44:43
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-22 23:10:29
 * @Description:标题
 */
import { jumpPage } from '@/common/utils/tools';
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
  title: string; // 显示的标题
  btn?: string;
  type?: string; // 标题前面的type 类型
  path?: string; // 跳转的路径
  list?: any; // 显示的列表
  active?: string; // 有列表时高亮的item
  margin?: string;
  callBack?: any;
}

const Title: FC<Props> = (Props) => {
  const { title, btn, type, path = '', list = [], active = '', callBack, margin = '21px 0' } = Props;
  const cls = path ? styles.cursor : '';
  return (
    <div className={styles.content} style={{ margin }}>
      {type && <div className={styles.type}>{type}</div>}
      <div className={[styles.title, cls].join(' ')} onClick={() => path && jumpPage(path)}>
        {title} {path && <span className="icon icon-back"></span>}
      </div>
      <div className={styles.tools}>
        {btn && <div className={styles.btn}>{btn}</div>}
        {list.map((item: string, index: number) => {
          const cls = item === active ? styles.active : '';
          return (
            <span key={index} className={cls} onClick={() => callBack(item)}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default Title;
