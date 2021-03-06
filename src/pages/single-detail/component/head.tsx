/*
 * @Author: REFUSE_C
 * @Date: 2021-05-12 22:37:16
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-19 22:46:24
 * @Description:
 */
import { FC, useContext, useState } from 'react';
import styles from '../index.module.scss';
import moment from 'moment';
import { Context } from '@utils/context';
import ReactMarkdown from 'react-markdown';
import PlayAll from '@/components/play-all';
import { playlistSubscribe } from '@/common/net/playList';
import { formatImgSize, formatNumber } from '@/common/utils/format';
import { albumSub } from '@/common/net/album';
import { Image, message } from 'antd';
import Tips from '@/components/model/tips';
import { jumpPage } from '@/common/utils/tools';

interface Props {
  data: object;
  type: string;
  list: any | [];
  info?: object;
  callBack: any;
  singleId?: number | string;
}

const Head: FC<Props> = (props: any) => {
  const [hasShow, setHasShow] = useState(false);
  const { data, info, type, list, singleId, callBack } = props;
  const {
    userId: user_id,
    name,
    id,
    coverImgUrl,
    creator,
    createTime,
    tags,
    subscribed,
    subscribedCount: singleSubcount,
    shareCount: singleCount,
    trackCount,
    playCount,
    description,
    // 专辑
    picUrl,
    artist,
    publishTime,
  } = data;
  const {
    isSub = false,
    shareCount: albumCount,
    subCount: albumSubcount,
    // albumGameInfo = null,
    // commentCount = 0, // 评论
    // likedCount = 0,
    // onSale = false,
    // subTime = 0,
  } = info;

  const { userInfo, getPlaylist, handleShare } = useContext(Context);
  const { userId, nickname } = userInfo;
  const isMe = user_id === userId;

  // 区分歌单 / 专辑数据
  const status = type === '专辑';
  const collection = status ? isSub : subscribed;
  const subcount = status ? albumSubcount : singleSubcount;
  const sharecount = status ? albumCount : singleCount;
  const shareType = status ? 'album' : 'playlist';

  // 收藏/取消收藏歌单
  const handleCollection = async (id, t) => {
    if (!hasShow && t === 2) return setHasShow(true);
    status ? albumCollection(id, t) : singCollection(id, t);
  };

  // 收藏歌单
  const singCollection = async (id, t) => {
    const res: any = await playlistSubscribe({ id, t });
    if (res.code === 200) {
      callBack(singleId, type); // 刷新歌单信息
      getPlaylist(userId, nickname); // 刷新左侧菜单信息
      message.success(t ? '歌单收藏成功' : '歌单取消收藏成功');
    }
  };

  // 收藏专辑
  const albumCollection = async (id, t) => {
    const res: any = await albumSub({ id, t });
    if (res.code === 200) {
      callBack(singleId, type); // 刷新专辑信息
      message.success(t ? '专辑收藏成功' : '专辑取消收藏成功');
    }
  };

  return (
    <div className={styles.head}>
      <Tips
        hasShow={hasShow}
        onFinish={() => handleCollection(id, 2)}
        onClose={() => setHasShow(false)}
        msg={`确定不再收藏该${type}`}
      />
      <div className={styles.left}>
        {/* <img src={formatImgSize(status ? picUrl : coverImgUrl, 184, 184)} alt="" /> */}
        <Image
          width={'100%'}
          height={'100%'}
          preview={false}
          src={formatImgSize(status ? picUrl : coverImgUrl, 184, 184)}
          fallback={
            'https://p1.music.126.net/Fihk6zWF24ZR0EhsjWOZqQ==/3308430489032745.jpg?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200'
          }
          placeholder={<Image preview={false} src={formatImgSize(status ? picUrl : coverImgUrl, 184, 184)} />}
        ></Image>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          <span>{type}</span>
          <span>{isMe ? name.replace(nickname, '我') : name}</span>
        </div>
        {creator && creator.avatarUrl && (
          <div className={styles.creator}>
            <img
              onClick={() => jumpPage(`/user${user_id}`)}
              src={formatImgSize(creator.avatarUrl, 24, 24)}
              alt=""
            />
            <p onClick={() => jumpPage(`/user${user_id}`)}>{creator.nickname}</p>
            <p>{createTime ? `${moment(createTime).format('YYYY-MM-DD')}创建` : ''}</p>
          </div>
        )}

        <div className={styles.btnGroup}>
          <PlayAll list={list} />
          <div className={styles.tool}>
            <p
              className={isMe ? styles.disabled : ''}
              onClick={() => handleCollection(singleId, collection ? 0 : 1)}
            >
              {collection ? '已收藏' : '收藏'}
              {!!subcount && `(${formatNumber(subcount)})`}
            </p>
            <p onClick={() => handleShare(id, shareType)}>分享{!!sharecount && `(${sharecount})`}</p>
            <p>下载全部</p>
          </div>
        </div>

        <div className={styles.info}>
          {artist && (
            <p className={styles.artist}>
              歌手：<span onClick={() => jumpPage(`/singer${artist.id}`)}>{artist.name}</span>
            </p>
          )}
          {publishTime && (
            <p className={styles.publishTime}>
              时间：<span>{moment(publishTime).format('YYYY-MM-DD')}</span>
            </p>
          )}
          {!!tags?.length ? (
            <div className={styles.tags}>
              标签 ：
              {tags.map((item: string, index: number) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          ) : null}
          {(!!trackCount || !!playCount) && (
            <div className={styles.count}>
              歌曲 ：<span>{trackCount}</span>
              播放 ：<span>{formatNumber(playCount)}</span>
            </div>
          )}
          {description && !status && (
            <div className={styles.makedown}>
              <ReactMarkdown
                remarkPlugins={[]}
                children={` **简介 ：** ` + description.replace(/\n/g, '\n * ')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Head;
