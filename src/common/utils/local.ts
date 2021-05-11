/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 23:45:32
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-11 23:43:05
 * @Description:
 */

/**
 * @name: 左侧菜单
 * @param {*}
 * @Description:
 * 1.name: 显示的名字
 * 2.path:路由地址
 * 3.type: 1可跳转路由 2标题(不可以跳转,非路由) 3暂未开发(保留字段)
 * 4.isBold 选中样式是否加粗 true加粗 false不加粗
 */
export const menuList = [
  {
    name: '发现音乐',
    path: '/find',
    type: 1,
    isBold: true,
    isFull: false,
  },
  {
    name: '视频',
    path: '/video',
    type: 1,
    isBold: true,
    isFull: false,
  },
  {
    name: '朋友',
    path: '/friend',
    type: 1,
    isBold: true,
    isFull: true,
  },
  {
    name: '直播',
    path: '/live',
    type: 1,
    isBold: true,
    isFull: true,
  },
  {
    name: '私人FM',
    path: '/fm',
    type: 1,
    isBold: true,
    isFull: false,
  },
  {
    name: '我的音乐',
    path: null,
    type: 2,
    isBold: false,
    isFull: true,
  },
  {
    name: '本地音乐',
    path: '/local',
    type: 1,
    isBold: false,
    isFull: true,
    icon: 'icon icon-yinle-01',
  },
  {
    name: '下载管理',
    path: '/download',
    type: 1,
    isBold: false,
    isFull: true,
    icon: 'icon icon-download',
  },
  {
    name: '我的音乐云盘',
    path: '/cloud',
    type: 1,
    isBold: false,
    isFull: true,
    icon: 'icon icon-cloud',
  },
  {
    name: '我的电台',
    path: '/radio',
    type: 1,
    isBold: false,
    isFull: true,
    icon: 'icon icon-radio',
  },
  {
    name: '我的收藏',
    path: '/collection',
    type: 1,
    isBold: false,
    isFull: true,
    icon: 'iocn icon-collection',
  },
  // {
  //   name: '创建的歌单',
  //   path: '/createPlaylist',
  //   type: 2,
  //   isBold: false,
  //   isFull: false,
  // },
];

/**
 * @name: 发现音乐顶部导航
 * @param {*}
 * @Description:
 * 1.name: 显示的名字
 * 2.path:路由地址
 */
export const findNav = [
  { name: '个性推荐', path: '/find' },
  { name: '歌单', path: '/find/playlist' },
  { name: '主播电台', path: '/find/radio' },
  { name: '排行榜', path: '/find/list' },
  { name: '歌手', path: '/find/singer' },
  { name: '最新音乐', path: '/find/newmusic' },
];

/**
 * @name: 视频顶部导航
 * @param {*}
 * @Description:
 * 1.name: 显示的名字
 * 2.path:路由地址
 */
export const videoNav = [
  { name: '视频', path: '/video' },
  { name: 'MV', path: '/video/mv' },
];
/**
 * @name: 用户信息初始化
 * @param {*}
 * @Description:
 */
export const initUserInfo = { userId: 0, nickname: '', avatarUrl: '' };
