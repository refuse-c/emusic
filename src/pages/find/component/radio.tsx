/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-08 11:07:55
 * @Description:发现音乐-主播电台
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import Banner from '@components/banner';
import { radioBanner } from '@/common/net/radio';

const Radio: FC = () => {
  const [bannerList, setBannerList] = useState([]);

  /**
   * @name:获取轮播图
   * @param {*} async
   * @Description:
   */
  const getRadioBanner = async () => {
    const result: any = await radioBanner();
    const bannerList = result.data || [];
    setBannerList(bannerList);
  };

  useEffect(() => {
    getRadioBanner();
  }, []);

  return (
    <div className={styles.radio}>
      <Banner list={bannerList || []} />
    </div>
  );
};

export default Radio;
