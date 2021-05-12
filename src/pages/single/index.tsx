/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:11:50
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-13 00:29:24
 * @Description:
 */
import { FC, useEffect, useState } from 'react';
import { Spin } from 'antd';
import Head from './component/head';
import styles from './index.module.scss';
import { withRouter } from 'react-router';
import { songDetail } from '@/common/net/api';
import { playlistDetail } from '@/common/net/playList';
import { assemblyIds, mergeData } from '@/common/utils/tools';

const Single: FC = (props: any) => {
  const id = props.match.params.id;
  const [list, setList] = useState<any>([]);
  const [headData, setHeadData] = useState({ coverImgUrl: '' });
  const [loading, setLoading] = useState(false);

  const getPlayListDetail = async (id: string) => {
    setLoading(true);
    const res: any = await playlistDetail({ id });
    const headData = res.playlist || {};
    const idsArr = assemblyIds(res.playlist.trackIds);
    getSongDetail(idsArr);
    setHeadData(headData);
    setLoading(false);
  };

  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    const { songs, privileges } = res;
    const list = mergeData(songs, privileges); // 合并数据
    setList(list);
  };
  useEffect(() => {
    getPlayListDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Spin spinning={loading}>
      <div className={styles.single}>
        <Head data={headData} />
        {list.map((item: { name: string }, index: number) => {
          return <div key={index}>{item.name}</div>;
        })}
      </div>
    </Spin>
  );
};

export default withRouter(Single);
