/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:37:16
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-13 14:22:17
 * @Description:
 */
import { FC, useContext } from 'react';
import styles from '../index.module.scss';
import moment from 'moment';
import { Context } from '@utils/context';
import ReactMarkdown from 'react-markdown';
import PlayAll from '@components/playAll';
import { playlistSubscribe } from '@/common/net/playList';
import { formatImgSize, formatNumber } from '@/common/utils/format';

interface Props {
  data: object;
  list: any | [];
  callBack: any;
  singleId?: number | string;
}

const Head: FC<Props> = (props: any) => {
  const { data, list, singleId, callBack } = props;
  const {
    userId: user_id,
    name,
    coverImgUrl,
    creator,
    createTime,
    tags,
    subscribed,
    subscribedCount,
    shareCount,
    trackCount,
    playCount,
    description,
  } = data;

  const { userInfo, getPlaylist } = useContext(Context);
  const { userId, nickname } = userInfo;
  const isMe = user_id === userId;

  // 收藏/取消收藏歌单
  const getPlaylistSubscribe = async (id: number | string, t: number) => {
    const res: any = await playlistSubscribe({ id, t });
    if (res.code === 200) {
      callBack(singleId); // 刷新歌单信息
      getPlaylist(userId, nickname); // 刷新左侧菜单信息
    }
  };

  return (
    <div className={styles.head}>
      <div className={styles.left}>
        <img src={formatImgSize(coverImgUrl, 184, 184)} alt="" />
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          <span>歌单</span>
          <span>{isMe ? name.replace(nickname, '我') : name}</span>
        </div>
        <div className={styles.creator}>
          <img src={formatImgSize(creator && creator.avatarUrl, 24, 24)} alt="" />
          <p>{creator && creator.nickname}</p>
          <p>{createTime ? `${moment(createTime).format('YYYY-MM-DD')}创建` : ''}</p>
        </div>
        <div className={styles.btnGroup}>
          <PlayAll list={list} />
          <div className={styles.tool}>
            <p
              className={isMe ? styles.disabled : ''}
              onClick={() => getPlaylistSubscribe(singleId, subscribed ? 2 : 1)}
            >
              {subscribed ? '已收藏' : '收藏'}
              {subscribedCount ? `(${formatNumber(subscribedCount)})` : ''}
            </p>
            <p>分享{shareCount ? `(${formatNumber(shareCount)})` : ''}</p>
            <p>下载全部</p>
          </div>
        </div>
        <div className={styles.info}>
          {tags && tags.length ? (
            <div className={styles.tags}>
              标签 ：
              {tags.map((item: string, index: number) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          ) : null}
          {trackCount || playCount ? (
            <div className={styles.count}>
              歌曲 ：<span>{trackCount}</span>
              播放 ：<span>{formatNumber(playCount)}</span>
            </div>
          ) : null}
          {description ? (
            <div className={styles.makedown}>
              <ReactMarkdown remarkPlugins={[]} children={` **简介 ：** ` + description.replace(/\n/g, '\n * ')} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Head;
