/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:37:16
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-08 20:44:00
 * @Description:用户详情-头部
 */
import { formatAllAuthTypes } from '@/common/utils/format';
import { jumpPage } from '@/common/utils/tools';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../index.module.scss';
import { cityList, getCityString } from '@/common/utils/city';
interface Props {
  data: object;
  isMe: boolean;
  getFollow?: (t: number) => void;
}

const Head: FC<Props> = (props: any) => {
  const { data, getFollow, isMe } = props;
  const { profile = {}, bindings = [], level } = data;

  const {
    city = '',
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
  const address = getCityString(cityList, String(city));
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
              {!!allAuthTypeData.length &&
                allAuthTypeData.map((item, index) => (
                  <li key={index} className={styles.identify}>
                    {item.desc}
                  </li>
                ))}
              <li className={styles.level}>Lv{level}</li>
              {!!gender && (
                <li
                  className={
                    gender === 1 ? styles.genderMan : styles.genderWomen
                  }
                ></li>
              )}
            </ul>
            <ul className={styles.list2}>
              {artistId && (
                <li onClick={() => jumpPage(`/singer${artistId}`)}>歌手页</li>
              )}
              {isMe && <li>编辑个人信息</li>}
              {!isMe && <li>发私信</li>}
              {!isMe && (
                <li onClick={() => getFollow(followed ? 0 : 1)}>
                  {followed ? '已关注' : '关注'}
                </li>
              )}
              {!isMe && <li className={styles.more}>more</li>}
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
            {address && (
              <li className={styles.address}>
                所在地区：<span>{address}</span>
              </li>
            )}
            {console.log(bindingsData)}
            <li className={styles.social}>
              社交网络：
              {bindingsData.length ? (
                bindingsData.map((item) => {
                  return <span className={styles.icon} key={item.type}></span>;
                })
              ) : (
                <span className={styles.notbind}>未绑定</span>
              )}
            </li>
            <li className={styles.personal}>
              {
                <ReactMarkdown
                  remarkPlugins={[]}
                  children={`**个人介绍：** ${signature || '暂无介绍'}`}
                />
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Head;
