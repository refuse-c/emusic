/*
 * @Author: REFUSE_C
 * @Date: 2021-05-24 22:10:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-27 17:17:56
 * @Description:搜索-用户
 */
import { FC, useEffect, useState, useContext } from 'react';
import styles from '../index.module.scss';
import { Context } from '@utils/context';
import { search } from '@/common/net/search';
import UserComponent from '@components/user';
import { Spin } from 'antd';
const User: FC = () => {
  const [list, setList] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const { searchText: keywords, dispatch } = useContext(Context);

  // 检索
  const getSearch = async (keywords: string) => {
    setList([]);
    setloading(true);
    const res: any = await search({ keywords, type: 1002, limit: 100 });
    console.log(res);
    const { userprofiles = [], userprofileCount = 0 } = res && res.result;
    const data = { type: 1002, total: userprofileCount };
    setloading(false);
    setList(userprofiles || []);
    dispatch({ type: 'searchInfo', data });
  };

  useEffect(() => {
    getSearch(keywords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords]);

  return (
    <Spin spinning={loading}>
      <div className={styles.box}>
        {list.length && !loading ? (
          <UserComponent list={list} />
        ) : !loading ? (
          <p className={styles.empty}>
            很抱歉,未能找到与" <span style={{ color: '#507DAF' }}>{keywords}</span> "相关的任何用户
          </p>
        ) : null}
      </div>
    </Spin>
  );
};

export default User;
