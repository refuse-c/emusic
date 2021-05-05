/*
 * @Author: REFUSE_C
 * @Date: 2021-05-05 13:55:52
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-05 13:57:41
 * @Description:精品歌单
 */
import { FC } from 'react';
import Title from '@pages/find/component/title';
const BoutiquePlaylist: FC = () => {
  return (
    <div>
      <Title title="推荐歌单" top={5} pathName="/find/boutiquePlaylist" />
    </div>
  );
};
export default BoutiquePlaylist;
