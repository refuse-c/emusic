/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-09 23:55:40
 * @Description:发现音乐-歌手
 */
import { FC, useState, useEffect } from 'react';
import styles from '../index.module.scss';
import { areaList, initialList, typeList } from '@/common/utils/local';
import SingTag from '@/components/singTag';
import { artistList } from '@/common/net/singer';
const Singer: FC = () => {
  const [area, setArea] = useState('-1');
  const [type, setType] = useState('-1');
  const [initial, setInitial] = useState('-1');
  const queryArtistList = () => {
    artistList({ limit: 10, offset: 0, area, type, initial })
      .then((res) => {
        console.log(res);
      })
      // .catch((err) => console.log(err));
      .then(null, (err) => console.log(err)); // catch
  };
  useEffect(() => {
    queryArtistList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
