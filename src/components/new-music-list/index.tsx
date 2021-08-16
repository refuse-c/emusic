/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-14 02:37:43
 * @Description:最新音乐组件
 */
import { formatImgSize } from '@/common/utils/format';
import { renderArtists } from '@/common/utils/tools';
import { FC, useState, useContext } from 'react';
import { Context } from '@utils/context';
import { _findIndex } from '@/common/utils/tools';
import styles from './index.module.scss';
import clone from 'clone';
interface Props {
  list?: any;
}

interface Item {
  name: string;
  al: any;
  transNames?: any;
}

const Songs: FC<Props> = (props) => {
  const { list } = props;
  const [active, setActive] = useState(NaN);
  const { songList, currentSong, dispatch } = useContext(Context);

  // 播放全部
  const playAll = (index: number) => {
    if (list.length) {
      dispatch({ type: 'songList', data: list });
      dispatch({ type: 'currentSong', data: list[index] });
    }
  };

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
    <ul className={styles.list}>
      {list.map((item: Item, index: number) => {
        const { al, name, transNames = [] } = item;
        const cls = index === active ? styles.active : '';
        const backgroundImage = `url(${formatImgSize(al.picUrl, 50, 50)})`;
        return (
          <li
            key={index}
            onClick={() => setActive(index)}
            onDoubleClick={() => playAll(index)}
            className={[styles.item, cls].join(' ')}
          >
            <div
              className={styles.img}
              onClick={() => addPlay(item)}
              style={{ backgroundImage }}
            ></div>
            <div className={styles.info}>
              <div className={styles.name}>
                {name}
                {transNames.length ? transNames[0] : null}
              </div>
              {renderArtists(item)}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Songs;
