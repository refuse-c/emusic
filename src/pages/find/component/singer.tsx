/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-11 09:49:19
 * @Description:发现音乐-歌手
 */
import { FC, useState, useEffect } from 'react';
import styles from '../index.module.scss';
import { areaList, initialList, typeList } from '@/common/utils/local';
import SingTag from '@/components/singTag';
import SingerComponent from '@components/singer';
import { artistList } from '@/common/net/singer';
const Singer: FC = () => {
  const [list, setList] = useState([]);
  const [area, setArea] = useState('-1');
  const [type, setType] = useState('-1');
  const [initial, setInitial] = useState('-1');
  const queryArtistList = () => {
    artistList({ area, type, initial, limit: 10, offset: 0 }).then(
      (res: any) => {
        console.log(res);
        setList(res.artists);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const handleTag = (key: string, type: number) => {
    type === 1 ? setArea(key) : type === 2 ? setType(key) : setInitial(key);
    queryArtistList();
  };
  useEffect(() => {
    queryArtistList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.singer}>
      <SingTag title="语种" active={area} list={areaList} cb={(key: string) => handleTag(key, 1)} />
      <SingTag title="分类" active={type} list={typeList} cb={(key: string) => handleTag(key, 2)} />
      <SingTag title="筛选" active={initial} list={initialList} width={44} cb={(key: string) => handleTag(key, 3)} />
      <SingerComponent list={list} />
    </div>
  );
};

export default Singer;
