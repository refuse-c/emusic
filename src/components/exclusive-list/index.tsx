/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-04 16:45:52
 * @Description:独家发送列表组件
 */
import { formatImgSize } from '@/common/utils/format';
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  list?: any;
  isAdaptive?: boolean; // 发现也入口为大图展示  独家放送列表页小图展示
}
interface Item {
  name: string;
  sPicUrl: string;
  picUrl: string; // 小图
}
const ExclusiveList: FC<Props> = (props) => {
  const { list, isAdaptive } = props;
  return (
    <ul className={styles.exclusiveList}>
      {list.map((item: Item, index: number) => {
        return (
          <li key={index} className={isAdaptive ? styles.adaptive : ''}>
            <div
              className={styles.imgBox}
              style={{
                backgroundImage: `url(${
                  isAdaptive
                    ? formatImgSize(item.picUrl, 334, 126)
                    : formatImgSize(item.sPicUrl, 334, 188)
                })`,
              }}
            ></div>
            <p>{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ExclusiveList;
