/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-19 16:13:26
 * @Description:control
 */
import { FC, useContext, useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { formatTime } from '@/common/utils/format';
import { songUrl } from '@/common/net/api';
import { message } from 'antd';
import { initTime } from '@/common/utils/local';

const Control: FC = () => {
  const refAudio = document.getElementById('refAudio') as any;
  const [url, setUrl] = useState('');
  const [songTime, setSongTime] = useState(initTime);
  const { isPlay, currentSong, dispatch } = useContext(Context);
  const { id } = currentSong;
  // 获取url
  const getSongUrl = async (id: number | string) => {
    if (!id) return message.error('发生未知错误');
    const params = { id, br: '128000' };
    const res: any = await songUrl(params);
    const url = res.data[0].url || `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    setUrl(url);
    dispatch({ type: 'isPlay', data: true });
  };

  // 暂停/播放
  const handlePaused = () => {
    dispatch({ type: 'isPlay', data: !isPlay });
    isPlay ? refAudio.pause() : refAudio.play();
  };

  useEffect(() => {
    getSongUrl(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    refAudio &&
      refAudio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = refAudio;
        setSongTime({ currentTime, duration });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refAudio]);

  return (
    <div className={styles.control}>
      <audio src={url} autoPlay loop id="refAudio" />
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
          <li className="icon icon-order"></li>
          <li className="icon icon-next" style={{ transform: 'rotate(180deg)' }}></li>
          <li className={`icon ${isPlay ? 'icon-pause' : 'icon-play'}`} onClick={() => handlePaused()}></li>
          <li className="icon icon-next"></li>
          <li>lyrc</li>
        </ul>
        <div className={styles.progress_box}>
          <p className={styles.time}>{formatTime(songTime.currentTime, true)}</p>
          <p className={styles.progress}></p>
          <p className={styles.time}>{formatTime(songTime.duration || Number(currentSong.dt) / 1000, true)}</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.quality}></div>
        <div className={styles.volume}></div>
        <div className={[styles.aa, 'icon icon-playlist'].join(' ')}></div>
      </div>
    </div>
  );
};

export default Control;
