/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-04 16:43:42
 * @Description:排列
 */
import { arrangeList } from '@/common/utils/local';
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  active: string;
  cb: (v) => void;
}

const Arrange: FC<Props> = (props) => {
  const { active, cb } = props;
  return (
    <ul className={styles.arrange}>
      {arrangeList.map((item) => {
        const cls = active === item.key ? styles.active : ' ';
        return (
          <li
            key={item.key}
            title={item.title}
            className={[item.cls, cls].join(' ')}
            onClick={() => cb(item.key)}
          ></li>
        );
      })}
    </ul>
  );
};

export default Arrange;
