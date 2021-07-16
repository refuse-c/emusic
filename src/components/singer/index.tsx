/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-08 20:16:34
 * @Description:歌手组件
 */
import { formatImgSize } from '@/common/utils/format';
import { FC } from 'react';
import styles from './index.module.scss';
import { createHashHistory } from 'history';
const history = createHashHistory();

interface Props {
  layout?: string;
  type?: number; // 1发现音乐-歌手 2搜索-歌手 3云音乐歌手榜
  list?: [] | any;
}

const Singer: FC<Props> = (props) => {
  const { list, type, layout = 'row' } = props;
  const cls = layout === 'row' ? styles.row : styles.col;

  return (
    <ul className={[styles.singer, cls].join(' ')}>
      {list.map((item: any, index: number) => {
        const rank = item.lastRank - index;
        const absRank = Math.abs(rank);
        const pathName = `/singerDetail${item.id}`;

        return (
          <li key={index} onClick={() => history.push(pathName)}>
            <div className={styles.content}>
              <div className={styles.left}>
                {type === 3 && (
                  <div>
                    <p>{index + 1}</p>
                    {rank > 0 ? <p>↑{absRank}</p> : rank < 0 ? <p>↓{absRank}</p> : <p>-{absRank}</p>}
                  </div>
                )}
                <img src={formatImgSize(item.img1v1Url, 180, 180)} alt="" />
              </div>
            </div>
            <div className={styles.info}>
              <p>{item.name}</p>
              {type === 3 && <div> 热度：{item.score}</div>}
              {type !== 3 && item.accountId && (
                <div className={['icon icon-usersetting', styles.accountId].join(' ')}></div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Singer;
