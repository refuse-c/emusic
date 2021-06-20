/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-17 10:10:57
 * @Description:播放全部
 */
import { FC, useContext } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { _findIndex } from '@/common/utils/tools';
import { message } from 'antd';
import clone from 'clone';

interface Props {
  list?: any | [];
}

const PlayAll: FC<Props> = (props) => {
  const { list } = props;
  const { songList, currentSong, dispatch } = useContext(Context);
  let canbeusedList = list.filter((item: { st: number; fee: number }) => item.st !== -200); // 筛选出没有版权的音乐
  canbeusedList = list.filter((item: { st: number; fee: number }) => item.fee !== 4); // 筛选出需要付费的专辑
  // 播放全部
  const playAll = () => {
    if (canbeusedList.length) {
      dispatch({ type: 'songList', data: canbeusedList });
      dispatch({ type: 'currentSong', data: canbeusedList[0] });
    } else {
      message.error('因合作方要求,该资源暂时下架>_<');
    }
  };

  // 添加全部
  const addAll = () => {
    let array = []; // 过滤非重复歌曲添加到播放列表
    let cloneList = clone(songList);
    if (!canbeusedList.length) return message.error('因合作方要求,该资源暂时下架>_<');
    if (cloneList.length) {
      let index = _findIndex(songList, currentSong.id); // 获取当前播放音乐的下标
      list.map((item: any) => {
        const _index = cloneList.findIndex((ele: { id: number }) => ele.id === item.id);
        if (_index === -1) array = array.concat(item);
        return item.id;
      });
      cloneList.splice(index + 1, 0, ...array);
    } else {
      cloneList = canbeusedList;
      dispatch({ type: 'currentSong', data: canbeusedList[0] });
    }
    message.success('已添加到播放列表');
    dispatch({ type: 'songList', data: cloneList });
  };

  return (
    <div className={styles.playAll}>
      <div className={styles.play}>
        <div
          className="icon icon-play"
          onClick={() => {
            playAll();
          }}
        >
          播放全部
        </div>
        <div
          className="icon icon-add"
          onClick={() => {
            addAll();
          }}
          title="添加全部到播放列表"
        ></div>
      </div>
    </div>
  );
};

export default PlayAll;
