/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:37:16
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 15:19:19
 * @Description:
 */
import { FC } from 'react';
import styles from '../index.module.scss';
import { formatImgSize } from '@/common/utils/format';
import { artistSub } from '@/common/net/singer';

interface Props {
  data: object;
  callBack?: any;
}

const Head: FC<Props> = (props: any) => {
  const { data, callBack } = props;
  const { id, albumSize, alias, followed, img1v1Url, musicSize, mvSize, name, picUrl, accountId = '' } = data;

  // 收藏/取消收藏歌手
  const getArtistSub = async (t: number) => {
    const res: any = await artistSub({ id, t });
    if (res.code === 200) {
      callBack(id); // 刷新歌手信息
    }
  };

  return (
    <div className={styles.head}>
      <div className={styles.left}>
        <img src={formatImgSize(picUrl || img1v1Url, 184, 184)} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          <p>{name}</p>
          <p>{alias}</p>
        </div>
        <div className={styles.btnGroup}>
          <div className={styles.tool}>
            <p onClick={() => getArtistSub(followed ? 2 : 1)}>{followed ? '已收藏' : '收藏'}</p>
            {accountId && <p>个人主页</p>}
          </div>
        </div>
        <div className={styles.info}>
          {!!musicSize && (
            <div>
              单曲数：<span>{musicSize}</span>
            </div>
          )}
          {!!albumSize && (
            <div>
              专辑数：<span>{albumSize}</span>
            </div>
          )}
          {!!mvSize && (
            <div>
              MV数：<span>{mvSize}</span>
            </div>
          )}
          {/* <div>演出数：</div> */}
        </div>
      </div>
    </div>
  );
};

export default Head;
