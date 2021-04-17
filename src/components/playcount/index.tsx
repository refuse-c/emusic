/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-16 20:20:07
 * @Description:播放数量
 */
import { formatNumber } from '@/common/utils/format';
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  top?: string;
  num: number;
}

const Playcount: FC<Props> = (props) => {
  const { num } = props;
  return <div className={styles.playcount}>{formatNumber(num)}</div>;
};

export default Playcount;
