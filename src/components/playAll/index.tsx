/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-20 22:58:37
 * @Description:播放全部
 */
import { FC, useContext } from 'react';
import styles from './index.module.scss';
import { Context } from '@utils/context';

interface Props {
  list?: any | [];
}

const PlayAll: FC<Props> = (props) => {
  const { list } = props;
  const { dispatch } = useContext(Context);
  const filterList = list.filter((item: { st: number }) => item.st !== -200); // 筛选出没有版权的音乐
  // 播放全部
  const playAll = () => {
    if (filterList.length) {
      dispatch({ type: 'currentIndex', data: 0 });
      dispatch({ type: 'songList', data: filterList });
      dispatch({ type: 'currentSong', data: filterList[0] });
    }
  };

  // 添加全部
  const addAll = () => {
    console.log(11111);
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
