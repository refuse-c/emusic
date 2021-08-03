/*
 * @Author: REFUSE_C
 * @Date: 2021-05-05 13:55:52
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-03 14:37:46
 * @Description:发现音乐-精品歌单
 */
import { FC } from 'react';
import Title from '@components/title';
const BoutiquePlaylist: FC = () => {
  return (
    <div>
      <Title title="推荐歌单" margin={'10px 0'} path="/find/boutiquePlaylist" />
    </div>
  );
};
export default BoutiquePlaylist;
