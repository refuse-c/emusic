/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-09 22:37:32
 * @Description:播放页
 */

/*     
privilege.fee
8、0：免费
4：所在专辑需单独付费
1：VIP可听
privilege.cs: 云盘
privilege.st：-200无版权
 */

import { FC, useState, useEffect, useContext } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import Content from '@components/view/content';
import { formatImgSize } from '@/common/utils/format';
import { simiSong, songDetail } from '@/common/net/api';
import { playlistSimi } from '@/common/net/playList';
import { createHashHistory } from 'history';
import clone from 'clone';
import { assemblyIds, mergeData, _findIndex } from '@/common/utils/tools';
const history = createHashHistory();
interface Props {
  num: number;
  lrc: [];
  isPlay: boolean;
  noLyric: any;
}
let T1: NodeJS.Timeout;
const Player: FC<Props> = (props) => {
  const { num, lrc, isPlay, noLyric } = props;
  const { songList, currentSong, showPlayer, dispatch } = useContext(Context);
  const { al, ar, name, id } = currentSong;
  const [rotate, setRotate] = useState(0);
  const [isShowMore, setIsShowMore] = useState(true);
  const [simePlaylist, setSimePlaylist] = useState([]);
  const [musicList, setMusicList] = useState<any>([]);

  // 获取相似歌单
  const getPaylistSimi = async (id) => {
    const res: any = await playlistSimi({ id });
    if (res.code === 200) setSimePlaylist(res.playlists || []);
  };

  // 获取相似音乐
  const getSimiSong = async (id) => {
    const res: any = await simiSong({ id });
    if (res.code === 200 && res.songs.length) {
      const idsArr = assemblyIds(res.songs);
      await getSongDetail(idsArr);
    } else {
      setMusicList([]);
    }
  };

  // 批量获取歌曲详情
  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    if (res.code === 200) {
      const { songs, privileges } = res;
      const musicList = mergeData(songs, privileges); // 合并数据
      setMusicList(musicList);
    }
  };

  useEffect(() => {
    if (isPlay) {
      clearInterval(T1);
      T1 = setInterval(() => {
        const num = rotate >= 720 ? 0 : rotate + 0.2;
        setRotate(num);
      }, 10);
    } else {
      clearInterval(T1);
    }
    return () => {
      clearInterval(T1);
    };
  }, [isPlay, rotate]);

  useEffect(() => {
    getPaylistSimi(id);
    getSimiSong(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 播放单曲
  const addPlay = (item: any) => {
    let cloneList = clone(songList);
    if (cloneList.length) {
      let _index1 = _findIndex(cloneList, item.id); // 查看当前歌曲是否在歌单里面
      let _index2 = _findIndex(cloneList, currentSong.id); // 获取当前播放音乐的下标
      if (_index1 === -1) {
        cloneList.splice(_index2 + 1, 0, item);
      }
    } else {
      cloneList = cloneList.concat(item);
    }
    dispatch({ type: 'currentSong', data: item });
    dispatch({ type: 'songList', data: cloneList });
  };

  return (
    <div className={styles.player}>
      <Content isFull={true} padding={30} maxWidth={1600}>
        <div className={styles.content}>
          <div className={styles.isShowMore} onClick={() => setIsShowMore(!isShowMore)}>
            OFF
          </div>
          <div className={styles.name}>
            <p>{name}</p>
            <p>
              {ar.map((item: any, index: number) => (
                <span key={index}> {item.name} </span>
              ))}
            </p>
          </div>
          <div className={styles.info}>
            <div className={styles.info_box}>
              <div className={styles.album_box} style={{ transform: `rotate(${rotate}deg)` }}>
                <img src={formatImgSize(al.picUrl, 170, 170)} alt="" />
              </div>
            </div>
            <div className={styles.info_box}>
              <ul className={styles.lrc_list} style={{ transform: `translateY(${-num * 30}px)` }}>
                {lrc.length > 0 ? (
                  lrc.map((item: any, index: number) => {
                    return (
                      <li className={index === num ? styles.active : styles.bb} key={index}>
                        {item.text}
                      </li>
                    );
                  })
                ) : (
                  <li className={styles.noLyric}>{noLyric()}</li>
                )}
              </ul>
            </div>
            {isShowMore && (
              <div className={styles.info_box}>
                {simePlaylist.length ? (
                  <>
                    <h2>包含这首歌的歌单</h2>
                    <ul>
                      {simePlaylist.map((item: any, index) => {
                        const pathName = `/single${item.id}/${'歌单'}`;
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              history.push(pathName);
                              dispatch({ type: 'showPlayer', data: !showPlayer });
                            }}
                          >
                            <img src={formatImgSize(item.creator.avatarUrl, 30, 30)} alt="" />
                            <p>{item.name}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : null}
                {musicList.length ? (
                  <>
                    <h2>喜欢这首歌的人也听</h2>
                    <ul>
                      {musicList.map((item: any, index) => {
                        return (
                          <li key={index} onClick={() => addPlay(item)}>
                            <img src={formatImgSize(item.al.picUrl, 30, 30)} alt="" />
                            <p>{item.name}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Player;
