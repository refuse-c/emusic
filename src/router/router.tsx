/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 00:03:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-03 14:41:03
 * @Description:
 */

import { lazy } from 'react';

const router = [
  { path: '/friend', component: lazy(() => import('@pages/friend')) }, // 朋友
  { path: '/exclusive', component: lazy(() => import('@pages/exclusive')) }, // 独家放送
  { path: '/single:id/:type', component: lazy(() => import('@/pages/single-detail')) }, // 歌单
  { path: '/recommendSong', component: lazy(() => import('@/pages/recommend-song')) }, // 推荐歌曲
  { path: '/singertop', component: lazy(() => import('@/pages/singer-top')) }, // 云音乐歌手榜
  { path: '/singer:id', component: lazy(() => import('@/pages/singer-detail')) }, // 歌手详情页
  { path: '/user:uid', component: lazy(() => import('@/pages/user-detail')) }, // 用户详情
  { path: '/setting', component: lazy(() => import('@pages/setting')) }, // 设置

  {
    path: '/find',
    component: lazy(() => import('@pages/find')), // 发现音乐
    router: [
      { path: '/find', component: lazy(() => import('@/pages/find/recmmend')) }, // 个性推荐
      { path: '/find/playlist', component: lazy(() => import('@/pages/find/single')) }, // 歌单
      { path: '/find/radio', component: lazy(() => import('@/pages/find/radio')) }, // 主播电台
      { path: '/find/toplist', component: lazy(() => import('@/pages/find/toplist')) }, // 排行榜
      { path: '/find/singer', component: lazy(() => import('@/pages/find/singer')) }, // 歌手
      { path: '/find/new', component: lazy(() => import('@/pages/find/new')) }, // 最新音乐
    ],
  },
  {
    path: '/video',
    component: lazy(() => import('@pages/video')), // 视频
    router: [
      { path: '/video', component: lazy(() => import('@pages/video/component/video')) }, // 视频
      { path: '/video/mv', component: lazy(() => import('@pages/video/component/mv')) }, // MV
    ],
  },

  {
    path: '/search',
    component: lazy(() => import('@/pages/search')), // 搜索页
    router: [
      { path: '/search', component: lazy(() => import('@/pages/search/component/single')) }, // 单曲
      { path: '/search/singer', component: lazy(() => import('@/pages/search/component/singer')) }, // 歌手
      { path: '/search/album', component: lazy(() => import('@/pages/search/component/album')) }, // 专辑
      { path: '/search/video', component: lazy(() => import('@/pages/search/component/video')) }, // 视频
      { path: '/search/playlist', component: lazy(() => import('@/pages/search/component/playlist')) }, // 歌单
      { path: '/search/lyric', component: lazy(() => import('@/pages/search/component/lyric')) }, // 歌词
      { path: '/search/radio', component: lazy(() => import('@/pages/search/component/radio')) }, // 主播电台
      { path: '/search/user', component: lazy(() => import('@/pages/search/component/user')) }, // 用户
    ],
  },
];

export default router;
