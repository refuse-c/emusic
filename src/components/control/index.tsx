/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-18 06:33:58
 * @Description:control
 */
import { FC, useContext } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { formatTime } from '@/common/utils/format';
interface Props {
  // title?: string;
}

const Control: FC<Props> = () => {
  // const { title } = props;
  const { currentSong } = useContext(Context);
  return (
    <div className={styles.control}>
      <div className={styles.left}>
        {currentSong.al.picUrl ? (
          <div className={styles.content}>
            <img className={styles.img_box} src={currentSong.al.picUrl} alt="" />
            <div className={styles.info}>
              <div>
                <p>{currentSong.name}</p>
                <p></p>
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
          <li className="icon icon-prev"></li>
          <li className="icon icon-pause"></li>
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
