/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-08 21:45:51
 * @Description:轮播图
 */
import { FC, useState, useEffect, useContext } from 'react';
import { songDetail } from '@/common/net/api';
import { formatImgSize } from '@/common/utils/format';
import { jumpPage, mergeData, _findIndex } from '@/common/utils/tools';
import { Context } from '@utils/context';
import styles from './index.module.scss';
import clone from 'clone';
import { message } from 'antd';
const { shell } = require('electron');
let timer: NodeJS.Timer | null;
interface Item {
  pic: string;
  targetType: number;
  imageUrl: string;
  typeTitle: string;
  titleColor: string;
}

const Banner: FC<{ list: any }> = (props) => {
  const { list } = props;
  const [active, setActive] = useState(0);
  const { songList, currentSong, dispatch } = useContext(Context);
  // 批量获取歌曲详情
  const getSongDetail = async (ids: string) => {
    const res: any = await songDetail({ ids });
    if (res.code === 200) {
      const { songs, privileges } = res;
      const arr = mergeData(songs, privileges); // 合并数据
      !!arr.length && play(arr[0]);
    }
  };
  // 播放
  const play = (obj) => {
    let cloneList = clone(songList);
    if (cloneList.length) {
      let index = _findIndex(songList, obj.id);
      if (index === -1) {
        const currentIndex = _findIndex(songList, currentSong.id);
        cloneList.splice(currentIndex + 1, 0, obj);
      }
    } else {
      cloneList = cloneList.concat(obj);
    }
    dispatch({ type: 'songList', data: cloneList });
    dispatch({ type: 'currentSong', data: obj });
  };

  // 点击轮播图
  const handleBanner = (item) => {
    const { url, targetType, encodeId } = item;
    switch (targetType) {
      case 1: // 播放音乐
        return getSongDetail(encodeId);
      case 10: // 跳转专辑详情页
        return jumpPage(`/single${encodeId}/专辑`);
      case 1004: // 跳转mv
        return jumpPage(`/mv${encodeId}`);
      case 3000: // 通过浏览器打开当前url
        return url && shell.openExternal(url);
      default:
        return message.info('developing');
    }
  };

  useEffect(() => {
    clearInterval(Number(timer));
    timer = setInterval(() => {
      const newActive = active + 1 === list.length ? 0 : active + 1;
      setActive(newActive);
    }, 5000);
    return () => clearInterval(Number(timer));
  }, [active, list.length]);

  return (
    <div className={styles.banner}>
      <ul className={styles.imgList}>
        {list.map((item: Item, index: number) => {
          const len = list.length - 1;
          const status = !!(index === active);
          const cls1 = status ? styles.active : '';
          const cls2 =
            index === (active === 0 ? len : active - 1)
              ? styles.active_left
              : '';
          const cls3 =
            index === (active === len ? 0 : active + 1)
              ? styles.active_right
              : '';
          const color = item.titleColor === 'red' ? '#CC4A4A' : '#4A79CC';
          return (
            <li
              key={index}
              className={[cls1, cls2, cls3].join(' ')}
              onClick={() => (status ? handleBanner(item) : setActive(index))}
            >
              {
                <img
                  src={formatImgSize(item.imageUrl || item.pic, 540, 198)}
                  alt=""
                />
              }
              <p style={{ backgroundColor: color }}>{item.typeTitle}</p>
            </li>
          );
        })}
        <div className={styles.arrow_prev}></div>
        <div className={styles.arrow_next}></div>
      </ul>
      <ul className={styles.pointList}>
        {list.map((_item, index: number) => {
          const cls = index === active ? styles.active : '';
          return (
            <li
              key={index}
              className={cls}
              onMouseEnter={() => setActive(index)}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};

export default Banner;
