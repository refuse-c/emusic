/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 15:57:07
 * @Description:发现音乐-主播电台
 */
import { FC, useEffect, useState } from 'react';
import styles from '../index.module.scss';
import Banner from '@components/banner';
import { radioBanner } from '@/common/net/radio';
import Content from '@components/view/content';
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
      <Content padding={'0 30px 30px'} isFull={false}>
        <Banner list={bannerList || []} />
      </Content>
    </div>
  );
};

export default Radio;
