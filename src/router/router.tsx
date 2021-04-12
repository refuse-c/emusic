/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 00:03:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-13 00:36:57
 * @Description:
 */

import Find from '@pages/find';
import Recommend from '@pages/find/component/recommend';
import PlayList from '@pages/find/component/playList';

import Video from '@pages/video';

import Friend from '@pages/friend';
const router = [
  {
    path: '/find',
    component: Find,
    router: [
      { path: '/find', component: Recommend },
      { path: '/find/playList', component: PlayList },
    ],
  },
  { path: '/video', component: Video },
  { path: '/friend', component: Friend },
];

export default router;
