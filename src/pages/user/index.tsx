/*
 * @Author: REFUSE_C
 * @Date: 2021-07-08 16:14:44
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-30 14:05:02
 * @Description:用户详情页
 */

import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import Head from './component/head';
import Content from '@components/view/content';
import { countries, follow, userBinding, userDetail } from '@/common/net/api';
import { message } from 'antd';

const UserDetail: FC = (props: any) => {
  const { uid } = props.match.params;

  const [userInfo, setUserInfo] = useState({});
  console.log(uid);

  // 获取用户信息
  const getUserDetail = async (uid) => {
    const res: any = await userDetail({ uid });
    console.log(res);
    if (res.code === 200) setUserInfo(res);
  };

  // 获取用户绑定信息
  const getUserBinding = async (uid) => {
    const res: any = await userBinding({ uid });
    console.log(res);
  };

  // 关注/取消关注用户
  const getFollow = async (t) => {
    const res: any = await follow({ id: uid, t });
    if (res.code === 200) {
      getUserDetail(uid);
      message.success(t ? '关注成功' : '取消关注成功');
    }
  };

  // 获取用户绑定信息
  const getCountries = async () => {
    const res: any = await countries();
    console.log(res);
  };

  console.log(userInfo);
  useEffect(() => {
    getCountries();
    getUserDetail(uid);
    getUserBinding(uid);
  }, [uid]);
  return (
    <div className={styles.userDetail}>
      <Content padding={'0 30px'} isFull>
        <Head data={userInfo || {}} getFollow={getFollow} />
      </Content>
    </div>
  );
};

export default UserDetail;
