/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-18 15:49:55
 * @Description:密码登录
 */
import { login } from '@/common/net/login';
import { FC, useContext } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
interface Props {
  title?: string;
}

const Empty: FC<Props> = (props) => {
  const { getPlaylist, getGrowthpoint, dispatch } = useContext(Context);
  // 登录
  const getLogin = async () => {
    const res: any = await login({
      phone: '13272946536',
      password: 'wangyi123@@',
    });
    if (res.code === 200) {
      if (res.code === 200) {
        const data = res.profile;
        const userId = data.userId;
        const nickname = data.nickname || '';
        getPlaylist(userId, nickname);
        getGrowthpoint();
        dispatch({ type: 'userInfo', data });
      }
    }
  };
  console.log(getLogin);
  const { title } = props;
  console.log(title);
  return <div className={styles.empty}>{title}</div>;
};

export default Empty;
