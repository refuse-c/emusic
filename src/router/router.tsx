/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 00:03:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-24 22:36:37
 * @Description:
 */

import Find from '@pages/find'; // 发现音乐
import FindRecommend from '@pages/find/component/recommend'; // 个性推荐
import FindPlaylist from '@pages/find/component/playlist'; // 歌单
import FindRadio from '@pages/find/component/radio'; // 主播电台
import FindToplist from '@pages/find/component/toplist'; // 排行榜
import FindSinger from '@pages/find/component/singer'; // 歌手
import FindNewmusic from '@pages/find/component/newmusic'; // 最新音乐
import RecommendSong from '@/pages/recommendSong'; // 推荐歌曲

import Video from '@pages/video'; // 视频

import Friend from '@pages/friend'; // 发现

import Exclusive from '@pages/exclusive'; // 独家放送

import Single from '@/pages/single'; // 歌单

import Search from '@/pages/search'; // 搜索页
import SearchSingle from '@/pages/search/component/single'; // 单曲
import SearchSinger from '@/pages/search/component/singer'; // 歌手
import SearchAlbum from '@/pages/search/component/album'; // 专辑
import SearchVideo from '@/pages/search/component/video'; // 视频
import SearchPlaylist from '@/pages/search/component/playlist'; // 歌单
import SearchLyric from '@/pages/search/component/lyric'; // 歌词
import SearchRadio from '@/pages/search/component/radio'; // 主播电台
import SearchUser from '@/pages/search/component/user'; // 用户

const router = [
  {
    path: '/find',
    component: Find,
    router: [
      { path: '/find', component: FindRecommend },
      { path: '/find/playlist', component: FindPlaylist },
      { path: '/find/radio', component: FindRadio },
      { path: '/find/toplist', component: FindToplist },
      { path: '/find/singer', component: FindSinger },
      { path: '/find/newmusic', component: FindNewmusic },
    ],
  },
  { path: '/video', component: Video },
  { path: '/friend', component: Friend },
  { path: '/exclusive', component: Exclusive },
  { path: '/single:id', component: Single },
  { path: '/recommendSong', component: RecommendSong },
  {
    path: '/search',
    component: Search,
    router: [
      { path: '/search', component: SearchSingle },
      { path: '/search/singer', component: SearchSinger },
      { path: '/search/album', component: SearchAlbum },
      { path: '/search/video', component: SearchVideo },
      { path: '/search/playlist', component: SearchPlaylist },
      { path: '/search/lyric', component: SearchLyric },
      { path: '/search/radio', component: SearchRadio },
      { path: '/search/user', component: SearchUser },
    ],
  },
];

export default router;
