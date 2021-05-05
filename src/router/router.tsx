/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 00:03:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-05 20:49:18
 * @Description:
 */

import Find from '@pages/find'; // 发现
import Recommend from '@pages/find/component/recommend'; // 个性推荐
import PlayList from '@pages/find/component/playList'; // 推荐歌单
// import BoutiquePlaylist from '@pages/find/component/BoutiquePlaylist'; // 精品歌单
import Video from '@pages/video'; // 视频

import Friend from '@pages/friend'; // 发现

import Exclusive from '@pages/exclusive'; // 独家放送

const router = [
  {
    path: '/find',
    component: Find,
    router: [
      { path: '/find', component: Recommend },
      {
        path: '/find/playList',
        component: PlayList,
        // router: [{ path: '/find/playList/boutiquePlaylist', component: BoutiquePlaylist }],
      },
    ],
  },
  { path: '/video', component: Video },
  { path: '/friend', component: Friend },
  { path: '/exclusive', component: Exclusive },
];

export default router;
