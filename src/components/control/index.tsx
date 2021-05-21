/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-21 18:57:43
 * @Description:control
 */
import { FC, useContext, useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { formatTime } from '@/common/utils/format';
import { songUrl } from '@/common/net/api';
import { message, Slider } from 'antd';
import { initSong, initTime } from '@/common/utils/local';
import { cutSong, debounce, getLocal, setLocal, _findIndex } from '@/common/utils/tools';

const Control: FC = () => {
  const refAudio = document.getElementById('refAudio') as any;
  const [url, setUrl] = useState('');
  const [model, setModel] = useState(getLocal('model') || 1);
  const [volume, setVolume] = useState(getLocal('volume') || 5);
  const [songTime, setSongTime] = useState(initTime);
  const { isPlay, songList, currentSong, showModal, dispatch } = useContext(Context);
  const { id } = currentSong;
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

  // 获取url
  const getSongUrl = async (id: number | string) => {
    if (!id) return message.error('发生未知错误');
    const params = { id, br: '128000' };
    const res: any = await songUrl(params);
    const url = res.data[0].url || `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    setUrl(url);
    // blobLoad(url);
    dispatch({ type: 'isPlay', data: true });
  };

  // 暂停/播放
  const handlePaused = () => {
    dispatch({ type: 'isPlay', data: !isPlay });
    isPlay ? refAudio.pause() : refAudio.play();
  };

  // 切歌
  const handlcutSong = (type: number) => {
    if (model === 3) return false;
    const currentIndex = _findIndex(songList, currentSong.id);
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
      <audio src={url} loop={model === 3} autoPlay preload="auto" id="refAudio" />
      <div className={styles.left}>
        {currentSong.al.picUrl ? (
          <div className={styles.content}>
            <img className={styles.img_box} src={currentSong.al.picUrl} alt="" />
            <div className={styles.info}>
              <div>
                <p>{currentSong.name}</p>
                <p className="icon icon-like"></p>
              </div>
              <div>
                {currentSong.ar.map((item: any, index: number) => (
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
