/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 23:45:32
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-15 23:00:05
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
 * @Description:
 * 1.name: 显示的名字
 * 2.path: 路由地址
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
 * @Description:
 * 1.name: 显示的名字
 * 2.path: 路由地址
 */
export const videoNav = [
  { name: '视频', path: '/video' },
  { name: 'MV', path: '/video/mv' },
];
/**
 * @name: 用户信息默认值
 * @param {*}
 * @Description:
 */
export const initUserInfo = { userId: 0, nickname: '', avatarUrl: '' };

/**
 * @name: 歌曲信息默认值
 * @param {*}
 * @Description:
 */
export const initSong = { id: 0, name: '', ar: [], dt: 0, al: { picUrl: '' } };

/**
 * @name: 歌曲列表二级导航列表
 * @param {*}
 * @Description:
 */
export const navigationList = [
  {
    key: 0,
    title: '歌曲列表',
  },
  {
    key: 0,
    title: '评论',
  },
  {
    key: 0,
    title: '收藏者',
  },
];

/**
 * @name:默认颜色
 * @param {*}
 */
export const defaultColor = [
  '#EC4141',
  '#9741EC',
  '#37D67A',
  '#2CCCE4',
  '#ff8a65',
  '#ba68c8',
  '#F44E3B',
  '#FE9200',
  '#A4DD00',
  '#68CCCA',
  '#AEA1FF',
  '#E27300',
  '#B0BC00',
  '#68BC00',
  '#16A5A5',
  '#009CE0',
  '#7B64FF',
  '#9F0500',
  '#C45100',
  '#FB9E00',
  '#0C797D',
  '#0062B1',
  '#653294',
  '#697689',
  '#555555',
];
