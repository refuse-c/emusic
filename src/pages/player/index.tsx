/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-06 23:40:45
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
interface Props {
  num: number;
  lrc: [];
  isPlay: boolean;
  noLyric: any;
}
let T1: NodeJS.Timeout;
const Player: FC<Props> = (props) => {
  const { num, lrc, isPlay, noLyric } = props;
  const { currentSong } = useContext(Context);
  const { al, ar, name } = currentSong;
  const [rotate, setRotate] = useState(0);

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
  return (
    <div className={styles.player}>
      <Content isFull={false} padding={30}>
        <div className={styles.content}>
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
            <div className={styles.info_box}>simi</div>
          </div>
        </div>
      </Content>
    </div>
  );
};

export default Player;
