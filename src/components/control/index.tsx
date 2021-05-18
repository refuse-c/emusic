/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-18 23:59:18
 * @Description:control
 */
import { FC, useContext, useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { formatTime } from '@/common/utils/format';
import { songUrl } from '@/common/net/api';
import { message } from 'antd';
interface Props {
  // title?: string;
}

const Control: FC<Props> = () => {
  // const { title } = props;
  const audio = useRef(null);
  const [url, setUrl] = useState('');
  const { isPlay, currentSong, dispatch } = useContext(Context);
  const id = currentSong.id;
  const getSongUrl = async (id: number | string) => {
    if (!id) return message.error('发生未知错误');
    const params = { id, br: '128000' };
    const res: any = await songUrl(params);
    const url = res.data[0].url || `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    setUrl(url);
    dispatch({ type: 'isPlay', data: true });
  };

  const handlePaused = () => {
    dispatch({ type: 'isPlay', data: !isPlay });
    const audioDom = audio.current as any;
    isPlay ? audioDom.pause() : audioDom.play();
  };

  useEffect(() => {
    getSongUrl(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className={styles.control}>
      <audio src={url} autoPlay loop ref={audio} />
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
          <li className="icon icon-cycle"></li>
          <li className="icon icon-next" style={{ transform: 'rotate(180deg)' }}></li>
          <li className={`icon ${isPlay ? 'icon-pause' : 'icon-play'}`} onClick={() => handlePaused()}></li>
          <li className="icon icon-next"></li>
          <li>lyrc</li>
        </ul>
        <div className={styles.progress_box}>
          <p className={styles.time}>00:00</p>
          <p className={styles.progress}></p>
          <p className={styles.time}>{formatTime(currentSong.dt)}</p>
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
