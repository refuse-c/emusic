/*
 * @Author: REFUSE_C
 * @Date: 2021-06-16 12:57:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-18 15:03:44
 * @Description: Mv
 */
import { FC, useState } from 'react';
import Title from '@components/title';
import styles from '../index.module.scss';
const list = ['内地', '港台', '欧美', '日本', '其他'];
const Mv: FC = () => {
  const [active, setActive] = useState('内地');

  // 获取热播MV
  // const getHotMv = () => {};

  return (
    <div className={styles.mv}>
      <Title
        title="最新MV"
        list={list}
        margin={'10px 0 '}
        path="/find/playlist"
        active={active}
        callBack={(active: string) => setActive(active)}
      />
      <Title title="热播MV" margin={'10px 0 '} path="/find/playlist" />
      <Title title="网易出品" margin={'10px 0 '} path="/find/playlist" />
      <Title title="MV排行榜" margin={'10px 0 '} path="/find/playlist" />
    </div>
  );
};

export default Mv;
