/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-17 18:04:03
 * @Description:独家发送
 */
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import Title from '@/components/title';
import { privatecontentList } from '@/common/net/api';
import ExclusiveList from '@/components/exclusiveList';
import Content from '@components/view/content';
const Exclusive: FC = () => {
  const [list, setList] = useState([]);
  const getPrivatecontentList = async () => {
    const res: any = await privatecontentList();
    const list = res.result || [];
    setList(list);
  };

  useEffect(() => {
    getPrivatecontentList();
  }, []);

  return (
    <div className={styles.exclusive}>
      <Content>
        <Title text="独家放送" />
        <ExclusiveList list={list} isAdaptive={true} />
      </Content>
    </div>
  );
};

export default Exclusive;
