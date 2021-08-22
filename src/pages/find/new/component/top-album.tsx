/*
 * @Author: REFUSE_C
 * @Date: 2021-08-03 15:54:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-04 22:27:12
 * @Description:
 */
import { FC, useState, useEffect } from 'react';
import { albumNew, topAblum } from '@/common/net/album';
import Album from '@components/album-list';
import styles from '../index.module.scss';
import { AREA_LIST } from '@/common/utils/constant';
import { Spin } from 'antd';
const limit = 500;
interface Props {
  areaType?: number | undefined;
  status: number;
}

const TopAblum: FC<Props> = (props) => {
  const { areaType, status } = props;
  const [data, setData] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const [spinning, setSpinning] = useState(false);

  // 新碟上架 推荐
  const getTopAlbum = async (area, limit, offset) => {
    setSpinning(true);
    const res: any = await topAblum({ area, limit, offset });
    setData(res);
    setSpinning(false);
  };

  // 新碟上架 全部
  const getTAlbumNew = async (area, limit, offset) => {
    setSpinning(true);
    const res: any = await albumNew({ area, limit, offset });
    setData(res);
    setSpinning(false);
  };

  useEffect(() => {
    setOffset(0);
    const area = AREA_LIST[areaType || 0].area;
    status ? getTAlbumNew(area, limit, offset) : getTopAlbum(area, limit, offset);
  }, [areaType, status, offset]);
  const { weekData = [], monthData = [], albums = [] } = data;

  return (
    <Spin spinning={spinning}>
      <div className={styles.topAblum}>
        <Album list={status ? albums : areaType === 0 ? weekData : monthData} layout="col" />
      </div>
    </Spin>
  );
};

export default TopAblum;
