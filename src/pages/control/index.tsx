/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-17 23:26:03
 * @Description:control
 */
import {
  FC,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { formatImgSize, formatTime } from '@/common/utils/format';
import { lyric, simiSong, songDetail, songUrl } from '@/common/net/api';
import { message, Slider } from 'antd';
import Player from '@pages/player';
import { initSong, initTime } from '@/common/utils/local';
import {
  cutSong,
  debounce,
  getLocal,
  setLocal,
  _findIndex,
  parseLRC,
  getTimeIndex,
  mergeData,
  assemblyIds,
} from '@/common/utils/tools';
import { createHashHistory } from 'history';
import { playlistSimi } from '@/common/net/playList';
const history = createHashHistory();
const Control: FC = () => {
  // let refPlayer = useRef(null) as React.RefObject<any>;
  let refAudio = useRef(null) as React.RefObject<any>;
  const [url, setUrl] = useState('');
  const [isMute, setIsMute] = useState(false);
  const [lrc, setLrc] = useState<any>([]);
  const [isShowlrc, setIsShowlrc] = useState(getLocal('showLrc') || false);
  const [lrcLoading, setLrcLoading] = useState(false);
  const [model, setModel] = useState(getLocal('model') || 1);
  const [volume, setVolume] = useState(getLocal('volume') || 5);
  const [songTime, setSongTime] = useState(initTime);
  const [simePlaylist, setSimePlaylist] = useState<any>([]);
  const [musicList, setMusicList] = useState<any>([]);
  const {
    isPlay,
    likeList,
    songList,
    currentSong,
    showModal,
    setLike,
    showPlayer,
    dispatch,
  } = useContext(Context);
  const { id, al, ar, name } = currentSong;
  const { currentTime, duration } = songTime;

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

  // 获取歌词
  const getLyric = async (id: number | string) => {
    if (!id) return false;
    const res: any = await lyric({ id });
    if (res.code === 200) {
      let lrcs = '';
      const { nolyric, lrc } = res; // tlyric
      if (!nolyric) {
        // console.log(klyric.lyric); // 逐字同步歌词
        // console.log(lrc.lyric); // 原歌词
        // console.log(tlyric.lyric); // 中文译文歌词
        lrcs = (lrc && lrc.lyric) || '';
      }
      setLrc(parseLRC(lrcs));
      setLrcLoading(false);
    }
  };
  // 获取url
  const getSongUrl = useCallback(
    async (id: number | string) => {
      setLrc('');
      if (!id) return false;
      const params = { id, br: '128000' };
      const res: any = await songUrl(params);
      if (res.code === 200) {
        const url =
          (res && res.data[0] && res.data[0].url) ||
          `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
        setUrl(url);
        // blobLoad(url);
        dispatch({ type: 'isPlay', data: true });
      }
    },
    [dispatch]
  );
  // 暂停/播放
  const handlePaused = () => {
    if (!songList.length)
      return message.info('当前无可以播放音乐,快去添加吧^v^');
    dispatch({ type: 'isPlay', data: !isPlay });
    isPlay ? refAudio.current?.pause() : refAudio.current?.play();
  };

  // 切歌
  const handlcutSong = async (type: number) => {
    setSongTime({ currentTime: 0, duration: 0 });
    const currentIndex = _findIndex(songList, id);
    const index = cutSong(currentIndex, songList, model, type);
    dispatch({
      type: 'currentSong',
      data: songList.length ? songList[index] : initSong,
    });
  };

  // 改变模式
  const handleModel = () => {
    const _model = model === 1 ? 2 : model === 2 ? 3 : 1;
    setModel(_model);
  };

  // 改变进度
  const changeCurrentTime = (value: number) => {
    if (refAudio) refAudio.current.currentTime = value;
  };

  // 改变音量
  const changeVolume = (value: number) => {
    setLocal('volume', value);
    if (refAudio) refAudio.current.volume = value / 100;
    setVolume(value);
    setIsMute(false);
    if (refAudio) refAudio.current.muted = false;
  };

  // 静音操作
  const changeMute = () => {
    if (refAudio) refAudio.current.muted = !isMute;
    setIsMute(!isMute);
  };
  // 无歌词渲染
  const noLyric = () => {
    return !id
      ? '(ಗ ‸ ಗ ) 未加载音频'
      : lrcLoading
      ? '(*ゝω・) 少女祈祷中..'
      : lrc
      ? '(,,•́ . •̀,,) 抱歉，当前歌曲暂无歌词'
      : '';
    //'(・∀・*) 抱歉，该歌词格式不支持'
  };

  // 是否显示歌词
  const setShowLrc = () => {
    setIsShowlrc(!isShowlrc);
    setLocal('showLrc', !isShowlrc);
  };

  // id改变后 获取播放地址 || 获取歌词 || 当前音乐播放完毕切换到下一首
  useEffect(() => {
    getSongUrl(id);
    getPaylistSimi(id);
    getSimiSong(id);
    setLrcLoading(true);
    setTimeout(() => {
      getLyric(id);
    }, 1500);
    // 播放结束切歌
    if (refAudio) {
      refAudio.current.addEventListener('ended', () => {
        debounce(() => handlcutSong(2), 1000);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 监听音乐的播放、暂停、错误
  useEffect(() => {
    if (refAudio) {
      refAudio.current.addEventListener('error', () => {
        getSongUrl(id);
        getLyric(id);
      });
    }
  }, [refAudio, id, getSongUrl]);

  // audio - timeupdate 缓冲进度 || 当前播放时间变化
  useEffect(() => {
    if (refAudio) {
      refAudio.current.volume = volume / 100;
      refAudio.current.addEventListener('timeupdate', () => {
        const { currentTime, duration, buffered } = refAudio.current;
        // 缓冲进度
        if (buffered.length) {
          const bufferTime = buffered.end(buffered.length - 1);
          const bw = Number((bufferTime / duration).toFixed(2)) * 100;
          const slider = document.getElementsByClassName(
            'ant-slider-rail'
          )[0] as HTMLElement;
          slider.style.background = `linear-gradient(to right, #cdcdcd ${bw}%, #e5e5e5 ${
            100 - bw
          }%)`;
        }
        model !== 3 && setSongTime({ currentTime, duration });
      });
    }
  }, [model, refAudio, volume]);

  const num = getTimeIndex(lrc, currentTime);
  return (
    <div className={styles.control}>
      {showPlayer && (
        <Player
          num={num}
          lrc={lrc}
          isPlay={isPlay}
          noLyric={noLyric}
          refAudio={refAudio}
          simePlaylist={simePlaylist}
          musicList={musicList}
          // ref={refPlayer}
        />
      )}
      {
        <div
          className={styles.lrc}
          style={{ height: isShowlrc ? 31 : 0, bottom: isShowlrc ? 73 : 72 }}
        >
          {isShowlrc && (
            <ul
              className={styles.content}
              style={{ transform: `translateY(${-num * 30}px)` }}
            >
              {lrc.length ? (
                lrc.map((item: any, index: number) => {
                  return (
                    <li
                      className={index === num ? styles.active : styles.bb}
                      key={index}
                    >
                      {item.text}
                    </li>
                  );
                })
              ) : (
                <li className={styles.noLyric}>{noLyric()}</li>
              )}
            </ul>
          )}
        </div>
      }
      <audio
        autoPlay
        preload="auto"
        id="refAudio"
        ref={refAudio}
        src={url.replace('http:', 'https:')}
        loop={songList.length === 1 || model === 3}
      />
      {songList.length ? (
        <div className={styles.left}>
          <div className={styles.content}>
            <img
              onClick={() =>
                dispatch({ type: 'showPlayer', data: !showPlayer })
              }
              className={styles.img_box}
              src={formatImgSize(al.picUrl, 48, 48)}
              alt=""
            />
            <div className={styles.info}>
              <div>
                <p>{name}</p>
                {likeList.includes(id) ? (
                  <p
                    onClick={() => setLike(id, false)}
                    style={{ color: '#EC4141' }}
                    className="icon icon-like"
                  ></p>
                ) : (
                  <p
                    onClick={() => setLike(id, true)}
                    className="icon icon-unlike"
                  ></p>
                )}
              </div>
              <div>
                {ar.map((item: any, index: number) => (
                  <span
                    key={index}
                    onClick={() => history.push(`/singer${item.id}`)}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className={styles.center}>
        <ul className={styles.btn_group}>
          <li
            className={`icon ${
              model === 1
                ? 'icon-order'
                : model === 2
                ? 'icon-random'
                : 'icon-cycle'
            }`}
            onClick={() => handleModel()}
          ></li>
          <li
            className="icon icon-next"
            onClick={() => handlcutSong(1)}
            style={{ transform: 'rotate(180deg)' }}
          ></li>
          <li
            className={`icon ${isPlay ? 'icon-pause' : 'icon-play'}`}
            onClick={() => handlePaused()}
          ></li>
          <li className="icon icon-next" onClick={() => handlcutSong(2)}></li>
          <li
            className={[
              isShowlrc ? styles.activeLrc : '',
              'icon icon-lrc',
            ].join(' ')}
            onClick={() => setShowLrc()}
          ></li>
        </ul>
        <div className={styles.progress_box}>
          <div className={styles.time}>{formatTime(currentTime, true)}</div>
          <div className={styles.progress}>
            <Slider
              min={0}
              max={duration}
              disabled={false}
              value={currentTime}
              tipFormatter={null}
              onChange={(value: number) => changeCurrentTime(value)}
            />
          </div>
          <div className={styles.time}>
            {formatTime(duration || Number(currentSong.dt) / 1000, true)}
          </div>
        </div>
      </div>
      {songList.length && (
        <ul className={styles.right}>
          <li
            className={[
              styles.quality,
              `icon ${isMute ? 'icon-mute' : 'icon-volume'}`,
            ].join(' ')}
            onClick={() => changeMute()}
          ></li>
          <li className={styles.volume}>
            <Slider
              min={0}
              max={100}
              tipFormatter={null}
              value={!isMute ? volume : 0}
              onChange={(value: number) => changeVolume(value)}
            />
          </li>
          <li
            className={[styles.list, 'icon icon-playlist'].join(' ')}
            onClick={(e) => {
              dispatch({
                type: 'showModal',
                data: showModal === 'showPlayList' ? '' : 'showPlayList',
              });
              e.stopPropagation();
            }}
          ></li>
        </ul>
      )}
    </div>
  );
};

export default Control;
