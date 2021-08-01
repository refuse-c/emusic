/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:37:16
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-01 12:08:47
 * @Description:
 */
import { formatAllAuthTypes } from '@/common/utils/format';
import { jumpPage } from '@/common/utils/tools';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../index.module.scss';

interface Props {
  data: object;
  getFollow?: (t) => void;
}

const Head: FC<Props> = (props: any) => {
  const { data, getFollow } = props;
  const { profile = {}, bindings = [], level } = data;

  const {
    avatarUrl,
    nickname,
    gender = '',
    eventCount = 0,
    artistId = '',
    follows = 0,
    followeds = 0,
    signature = '',
    followed = false,
    allAuthTypes = [],
  } = profile;
  const allAuthTypeData = formatAllAuthTypes(allAuthTypes);
  const bindingsData = bindings.filter((item) => item.url);
  return (
    <div className={styles.head}>
      <div className={styles.left}>
        <img src={avatarUrl} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <p className={styles.nickname}>{nickname}</p>
          <div className={styles.topInfo}>
            <ul className={styles.list1}>
              <li className={styles.isvip}>会员</li>
              {!!allAuthTypeData.length && (
                <li className={styles.identify}>
                  {allAuthTypeData.map((item, index) => (
                    <span key={index}>{item.desc}</span>
                  ))}
                </li>
              )}
              <li className={styles.lv}>Lv{level}</li>
              {!!gender && <li className={gender === 1 ? styles.genderMan : styles.genderWomen}></li>}
            </ul>
            <ul className={styles.list2}>
              {artistId && <li onClick={() => jumpPage(`/singer${artistId}`)}>歌手页</li>}
              <li>发私信</li>
              <li onClick={() => getFollow(followed ? 0 : 1)}>{followed ? '已关注' : '关注'}</li>
              <li>more</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <ul className={styles.list3}>
            <li>
              <p>{eventCount}</p>
              <p>动态</p>
            </li>
            <li>
              <p>{follows}</p>
              <p>关注</p>
            </li>
            <li>
              <p>{followeds}</p>
              <p>粉丝</p>
            </li>
          </ul>
          <ul className={styles.list4}>
            {/* <li className={styles.address}>所在地区：</li> */}
            <li className={styles.social}>
              社交网络：
              {bindingsData.map((item, index) => (
                <span key={index}>{item.type}</span>
              ))}
            </li>
            <li className={styles.personal}>
              {<ReactMarkdown remarkPlugins={[]} children={` **个人介绍：** ` + signature} />}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Head;
