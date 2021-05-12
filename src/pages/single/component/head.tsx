/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:37:16
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-13 00:25:09
 * @Description:
 */
import { FC, useContext } from 'react';
import styles from '../index.module.scss';
import { MyContext } from '@pages/app/context/context';
import { formatImgSize } from '@/common/utils/format';
interface Props {
  data: object;
}
const Head: FC<Props> = (props: any) => {
  const { data } = props;
  const { userId: user_id, name, coverImgUrl } = data;
  const { userInfo } = useContext(MyContext);
  const { userId, nickname } = userInfo;
  console.log(data);
  return (
    <div className={styles.head}>
      <div className={styles.left}>
        <img src={formatImgSize(coverImgUrl, 184, 184)} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          <span>歌单</span>
          <span>{user_id === userId ? name.replace(nickname, '我') : name}</span>
        </div>
        <div className={styles.creator}></div>
        <div className={styles.btnGroup}></div>
        <div className={styles.info}></div>
      </div>
    </div>
  );
};

export default Head;
