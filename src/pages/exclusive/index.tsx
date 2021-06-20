/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-18 00:27:43
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
    if (res.code === 200) setList(res.result || []);
  };

  useEffect(() => {
    getPrivatecontentList();
  }, []);

  return (
    <div className={styles.exclusive}>
      <Content>
        <Title title="独家放送" />
        <ExclusiveList list={list} isAdaptive={true} />
      </Content>
    </div>
  );
};

export default Exclusive;
