/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 23:45:32
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-05 21:56:32
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
  },
  {
    name: '视频',
    path: '/video',
    type: 1,
    isBold: true,
  },
  {
    name: '朋友',
    path: '/friend',
    type: 1,
    isBold: true,
  },
  {
    name: '直播',
    path: '/live',
    type: 1,
    isBold: true,
  },
  {
    name: '私人FM',
    path: '/fm',
    type: 1,
    isBold: true,
  },
  {
    name: '我的音乐',
    path: null,
    type: 2,
    isBold: false,
  },
  {
    name: '本地音乐',
    path: '/local',
    type: 1,
    isBold: false,
    // icon: 'icon icon-yinle-01',
  },
  {
    name: '下载管理',
    path: '/download',
    type: 1,
    isBold: false,
    // icon: 'icon icon-download',
  },
  {
    name: '我的音乐云盘',
    path: '/cloud',
    type: 1,
    isBold: false,
    // icon: 'icon icon-cloud',
  },
  {
    name: '我的电台',
    path: '/radio',
    type: 1,
    isBold: false,
    // icon: 'icon icon-radio',
  },
  {
    name: '我的收藏',
    path: '/collection',
    type: 1,
    isBold: false,
    // icon: 'iocn icon-collection',
  },
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
  { name: '排行榜', path: '/find/toplist' },
  { name: '歌手', path: '/find/singer' },
  { name: '最新音乐', path: '/find/new' },
];

export const searchNav = [
  { name: '单曲', path: '/search', type: 1, unit: '首' },
  { name: '歌手', path: '/search/singer', type: 100, unit: '位' },
  { name: '专辑', path: '/search/album', type: 10, unit: '张' },
  { name: '视频', path: '/search/video', type: 1014, unit: '个' },
  { name: '歌单', path: '/search/playlist', type: 1000, unit: '个' },
  { name: '歌词', path: '/search/lyric', type: 1006, unit: '首' },
  { name: '主播电台', path: '/search/radio', type: 1009, unit: '个' },
  { name: '用户', path: '/search/user', type: 1002, unit: '位' },
];

/**
 * @name:播放列表导航
 * @param {*}
 */
export const playListNav = [{ name: '播放列表' }, { name: '历史记录' }];

/**
 * @name:最新音乐导航
 * @param {*}
 */
export const newMusicNav = [{ name: '新歌速递' }, { name: '新碟上架' }];

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
 * @name: 初始化歌曲时间
 * @param {*}
 * @Description:
 */
export const initTime = { currentTime: 0, duration: 0 };

/**
 * @name: 检索信息
 * @param {*}
 * @Description:
 */
export const initSearchInfo = { total: 0, type: 1 };

/**
 * @name: 歌曲列表二级导航列表
 * @param {*}
 * @Description:
 */
export const navigationList = [
  { key: 1, title: '歌曲列表' },
  { key: 2, title: '评论' },
  { key: 3, title: '收藏者' },
];

/**
 * @name: 歌手详情二级导航
 * @param {*}
 * @Description:
 */
export const singerDetailNavList = [
  { key: 1, title: '专辑' },
  { key: 2, title: 'MV' },
  { key: 3, title: '歌手详情' },
  { key: 3, title: '相似歌手' },
];

/**
 * @name:歌手榜单二级导航
 * @param {*}
 * @Description:
 */
export const singerTopNav = [
  { key: 1, title: '华语' },
  { key: 2, title: '欧美' },
  { key: 3, title: '韩国' },
  { key: 3, title: '日本' },
];

/**
 * @name: 默认搜索关键词
 * @param {*}
 */
export const defaultVal = {
  realkeyword: '',
  searchType: 1,
  showKeyword: '',
};

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

/**
 * @name: 歌手分类-首字母
 * @param {*}
 */
export const initialList = [
  { name: '热门', key: '-1' },
  { name: 'A', key: 'a' },
  { name: 'B', key: 'b' },
  { name: 'C', key: 'c' },
  { name: 'D', key: 'd' },
  { name: 'E', key: 'e' },
  { name: 'F', key: 'f' },
  { name: 'G', key: 'g' },
  { name: 'H', key: 'h' },
  { name: 'I', key: 'i' },
  { name: 'J', key: 'j' },
  { name: 'K', key: 'k' },
  { name: 'L', key: 'l' },
  { name: 'M', key: 'm' },
  { name: 'N', key: 'n' },
  { name: 'O', key: 'o' },
  { name: 'P', key: 'p' },
  { name: 'Q', key: 'q' },
  { name: 'R', key: 'r' },
  { name: 'S', key: 's' },
  { name: 'T', key: 't' },
  { name: 'U', key: 'u' },
  { name: 'V', key: 'v' },
  { name: 'W', key: 'w' },
  { name: 'X', key: 'x' },
  { name: 'Y', key: 'y' },
  { name: 'Z', key: 'z' },
  { name: '#', key: '0' },
];

/**
 * @name: 歌手分类-类型
 * @param {*}
 */
export const typeList = [
  { name: '全部', key: '-1' },
  { name: '男歌手', key: '1' },
  { name: '女歌手', key: '2' },
  { name: '乐队', key: '3' },
];

/**
 * @name: 歌手分类-地区
 * @param {*}
 */
export const areaList = [
  { name: '全部', title: '全部', area: 'ALL', key: '-1' },
  { name: '华语', title: '华语', area: 'ZH', key: '7' },
  { name: '欧美', title: '欧美', area: 'EA', key: '96' },
  { name: '韩国', title: '韩国', area: 'KR', key: '16' },
  { name: '日本', title: '日本', area: 'JP', key: '8' },
];

/**
 * @name: 排列方法
 * @param {*}
 */
export const arrangeList = [
  { title: '大图模式', key: 'row', cls: 'icon icon-list1' },
  { title: '列表模式', key: 'col', cls: 'icon icon-list2' },
  // { title: '图例模式', key: 'detail', cls: 'icon icon-list3' },
];

/**
 * @name: 排列方法
 * @param {*}
 */
export const albumList = [
  { title: '推荐', key: 0 },
  { title: '全部', key: 1 },
];
