/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 15:59:38
 * @Description:发现音乐-歌手
 */
import { FC, useState, useEffect, useCallback } from 'react';
// import styles from '../index.module.scss';
import { areaList, initialList, typeList } from '@/common/utils/local';
import SingTag from '@/components/sing-tag';
import SingerComponent from '@/components/singer-list';
import { artistList } from '@/common/net/singer';
import { Spin } from 'antd';
import Content from '@components/view/content';

const Singer: FC = () => {
  const [list, setList] = useState([]);
  const [area, setArea] = useState('-1');
  const [type, setType] = useState('-1');
  const [initial, setInitial] = useState('-1');
  const [loading, setLoading] = useState(false);
  const queryArtistList = useCallback(async () => {
    setLoading(true);
    const res: any = await artistList({ area, type, initial, limit: 100, offset: 0 });
    setLoading(false);
    if (res.code === 200) {
      setList(res.artists || []);
    } else {
      setLoading(false);
    }
  }, [area, type, initial]);

  /**
   * @name: 切换tag
   * @param {string} key
   * @param {number} type
   * @Description:
   */
  const handleTag = (key: string, type: number) =>
    type === 1 ? setArea(key) : type === 2 ? setType(key) : setInitial(key);

  useEffect(() => {
    queryArtistList();
  }, [queryArtistList]);

  return (
    <Spin spinning={loading}>
      <Content padding={'0 30px 30px'} isFull={false}>
        <SingTag title="语种" active={area} list={areaList} cb={(key: string) => handleTag(key, 1)} />
        <SingTag title="分类" active={type} list={typeList} cb={(key: string) => handleTag(key, 2)} />
        <SingTag title="筛选" active={initial} list={initialList} width={44} cb={(key: string) => handleTag(key, 3)} />
      </Content>
      <SingerComponent list={list} type={1} layout="col" />
    </Spin>
  );
};

export default Singer;
