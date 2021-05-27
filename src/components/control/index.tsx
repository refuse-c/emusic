/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-27 23:03:13
 * @Description:control
 */
import { FC, useContext, useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { formatTime } from '@/common/utils/format';
import { lyric, songUrl } from '@/common/net/api';
import { Slider } from 'antd';
import { initSong, initTime } from '@/common/utils/local';
import { cutSong, debounce, getLocal, setLocal, _findIndex, parsingLyrics, getTimeIndex } from '@/common/utils/tools';

const Control: FC = () => {
  const refAudio = document.getElementById('refAudio') as any;
  const [url, setUrl] = useState('');
  const [lrc, setLrc] = useState<any>([]);
  const [model, setModel] = useState(getLocal('model') || 1);
  const [volume, setVolume] = useState(getLocal('volume') || 5);
  const [songTime, setSongTime] = useState(initTime);
  const { isPlay, likeList, songList, currentSong, showModal, setLike, dispatch } = useContext(Context);
  const { id, al, ar, name } = currentSong;
  const { currentTime, duration } = songTime;
  // 通过blob预加载全部音频
  // const blobLoad = (src: string) => {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', src, true);
  //   req.responseType = 'blob';
  //   req.onload = function () {
  //     if (this.status === 200) {
  //       const blob = this.response;
  //       const blobSrc = URL.createObjectURL(blob);
  //       console.log(blobSrc);
  // setUrl(blobSrc);
  //     }
  //   };
  //   req.onerror = function () {
  // Error
  //   };
  //   req.send();
  // };

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
        lrcs = lrc.lyric || '';
      }
      const aaa = parsingLyrics(lrcs);
      setLrc(aaa.lyric);
    }
  };
  // 获取url
  const getSongUrl = async (id: number | string) => {
    if (!id) return false;
    const params = { id, br: '128000' };
    const res: any = await songUrl(params);
    if (res.code === 200) {
      const url = (res && res.data[0] && res.data[0].url) || `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      setUrl(url);
      // blobLoad(url);
      dispatch({ type: 'isPlay', data: true });
    }
  };
  // 暂停/播放
  const handlePaused = () => {
    dispatch({ type: 'isPlay', data: !isPlay });
    isPlay ? refAudio.pause() : refAudio.play();
  };

  // 切歌
  const handlcutSong = (type: number) => {
    if (model === 3) return false;
    const currentIndex = _findIndex(songList, id);
    const index = cutSong(currentIndex, songList, model, type);
    dispatch({ type: 'currentSong', data: songList.length ? songList[index] : initSong });
  };

  // 改变模式
  const handleModel = () => {
    const _model = model === 1 ? 2 : model === 2 ? 3 : 1;
    setModel(_model);
  };

  // 改变进度
  const changeCurrentTime = (value: number) => {
    refAudio.currentTime = value;
  };

  // 改变音量
  const changeVolume = (value: number) => {
    setLocal('volume', value);
    refAudio.volume = value / 10;
    setVolume(value);
  };

  useEffect(() => {
    getSongUrl(id);
    getLyric(id);
    // 播放结束切歌
    if (refAudio) {
      refAudio.addEventListener('ended', () => {
        debounce(() => handlcutSong(2), 1000);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (refAudio) {
      refAudio.volume = volume / 10;
      refAudio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = refAudio;
        setSongTime({ currentTime, duration });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refAudio]);
  return (
    <div className={styles.control}>
      <div className={styles.lrc}>
        <ul className={styles.content} id="lrc">
          {lrc.map((item, index) => {
            const num = getTimeIndex(lrc, currentTime);
            const ids = document.getElementById('lrc') as any;
            ids.style.transform = `translateY(${-num * 30}px)`;
            return (
              <li className={index === num ? styles.active : styles.bb} key={index}>
                {item.lyric}
              </li>
            );
          })}
        </ul>
      </div>
      <audio src={url} loop={model === 3} autoPlay preload="auto" id="refAudio" />
      <div className={styles.left}>
        {al.picUrl ? (
          <div className={styles.content}>
            <img className={styles.img_box} src={al.picUrl} alt="" />
            <div className={styles.info}>
              <div>
                <p>{name}</p>
                {likeList.includes(id) ? (
                  <p onClick={() => setLike(id, false)} style={{ color: '#EC4141' }} className="icon icon-like"></p>
                ) : (
                  <p onClick={() => setLike(id, true)} className="icon icon-like"></p>
                )}
              </div>
              <div>
                {ar.map((item: any, index: number) => (
                  <span key={index}>{item.name}</span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.center}>
        <ul className={styles.btn_group}>
          <li
            className={`icon ${model === 1 ? 'icon-order' : model === 2 ? 'icon-random' : 'icon-cycle'}`}
            onClick={() => handleModel()}
          ></li>
          <li className="icon icon-next" onClick={() => handlcutSong(1)} style={{ transform: 'rotate(180deg)' }}></li>
          <li className={`icon ${isPlay ? 'icon-pause' : 'icon-play'}`} onClick={() => handlePaused()}></li>
          <li className="icon icon-next" onClick={() => handlcutSong(2)}></li>
          <li>lyrc</li>
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
          <div className={styles.time}>{formatTime(duration || Number(currentSong.dt) / 1000, true)}</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li className={[styles.quality, 'icon icon-volume'].join(' ')}></li>
        <li className={styles.volume}>
          <Slider
            min={0}
            max={10}
            value={volume}
            tipFormatter={null}
            onChange={(value: number) => changeVolume(value)}
          />
        </li>
        <li
          className={[styles.list, 'icon icon-playlist'].join(' ')}
          onClick={(e) => {
            dispatch({ type: 'showModal', data: showModal === 'showPlayList' ? '' : 'showPlayList' });
            e.stopPropagation();
          }}
        ></li>
      </ul>
    </div>
  );
};

export default Control;
