/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-09 18:57:40
 * @Description:发现音乐-歌手
 */
import { FC, useState } from 'react';
import styles from '../index.module.scss';
import { areaList, initialList, typeList } from '@/common/utils/local';
import SingTag from '@/components/singTag';

const Singer: FC = () => {
  const [area, setArea] = useState('-1');
  const [type, setType] = useState('-1');
  const [initial, setInitial] = useState('-1');
  return (
    <div className={styles.singer}>
      <SingTag title="语种" active={area} list={areaList} cb={(key: string) => setArea(key)} />
      <SingTag title="分类" active={type} list={typeList} cb={(key: string) => setType(key)} />
      <SingTag title="筛选" active={initial} list={initialList} width={44} cb={(key: string) => setInitial(key)} />
      {console.log(area, type, initial)}
    </div>
  );
};

export default Singer;
