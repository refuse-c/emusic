/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-25 19:56:33
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

import {
  useState,
  useEffect,
  useContext,
  // forwardRef,
  // useImperativeHandle,
} from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import Content from '@components/view/content';
import { formatImgSize } from '@/common/utils/format';
import clone from 'clone';
import { jumpPage, _findIndex } from '@/common/utils/tools';
interface Props {
  num: number;
  lrc: string[];
  isPlay: boolean;
  noLyric: any;
  refAudio: any;
  simePlaylist: string[];
  musicList: string[];
}
let T1: NodeJS.Timeout;
const Player = (props: Props) => {
  // ref: any
  const { num, lrc, isPlay, noLyric, refAudio, simePlaylist, musicList } = props;
  const { songList, currentSong, showPlayer, dispatch } = useContext(Context);
  const { al, ar, name } = currentSong;
  const [rotate, setRotate] = useState(0);
  const [isShowMore, setIsShowMore] = useState(true);
  //设置暴露给父组件的值
  // useImperativeHandle(ref, () => ({
  //   refPlayer: lrcScroll,
  // }));

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

  // 歌词滚动
  const lrcScroll = (num) => {
    const el = document.getElementById(`line${num}`);
    el &&
      el.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
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
    lrcScroll(num);
  }, [num]);

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
              <ul className={styles.lrc_list}>
                {lrc.length > 0 ? (
                  lrc.map((item: any, index: number) => {
                    return (
                      <li
                        key={index}
                        id={`line${index}`}
                        onClick={() => {
                          if (index !== num) refAudio.current.currentTime = item.time / 1000;
                        }}
                        className={index === num ? styles.active : ''}
                      >
                        {item.text}
                      </li>
                    );
                  })
                ) : (
                  <li id="line0" className={styles.noLyric}>
                    {noLyric()}
                  </li>
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
                        const { id, creator, name } = item;
                        const pathName = `/single${id}/${'歌单'}`;
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              jumpPage(pathName);
                              dispatch({
                                type: 'showPlayer',
                                data: !showPlayer,
                              });
                            }}
                          >
                            <img src={formatImgSize(creator.avatarUrl, 30, 30)} alt="" />
                            <p>{name}</p>
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
// const Player = forwardRef(Player);
export default Player;
