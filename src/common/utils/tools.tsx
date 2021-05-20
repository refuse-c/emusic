/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-20 23:53:12
 * @Description:
 */

/** 是否是数组
 * @name:
 * @param {*} arr
 */
import styles from '@common/css/index.module.scss';
import { message } from 'antd';
// interface params {
//   list: [];
//   type: string;
//   index: number;
//   orderType: number;
// }

export const isArray = (arr: []) => {
  return arr instanceof Array;
};

/** 加载歌手名字
 * @name:
 * @param {*} arr
 */
interface Item {
  name: string;
}
export const renderArtists = (arr: []) => {
  return (
    <ul className={styles.artists}>
      {arr.map((item: Item, index: number) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
};

/**
 * @name: 组装歌曲ids
 * @param {any} arr
 * @Description:
 */
export const assemblyIds = (arr: any) => {
  let ids = arr.map((item: { id: string }) => item.id).join(',');
  return ids;
};

/**
 * @name: 歌曲数据合并
 * @param {any} arr
 * @Description:
 */
export const mergeData = (songs: [], privileges: []) => {
  return privileges.reduce((pre: any[], cur: { id: any }) => {
    const item = pre.find((el: { id: any }) => el.id === cur.id);
    if (item) Object.assign(item, cur);
    return pre;
  }, songs);
};

/**
 * @name:缓存处理
 * @param {*} name
 * @param {*} data
 */
export const setLocal = (name: string, data: any) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};
export const getLocal = (name: string) => {
  const data = window.localStorage.getItem(name);
  if (data) return JSON.parse(data);
};
export const reLocal = (name: string) => {
  window.localStorage.removeItem(name);
};
export const setSession = (name: string, data: any) => {
  window.sessionStorage.setItem(name, JSON.stringify(data));
};
export const getSession = (name: string) => {
  const data = window.sessionStorage.getItem(name);
  if (data) return JSON.parse(data);
};
export const reSession = (name: string) => {
  window.sessionStorage.removeItem(name);
};

/**
 * @name: 切歌
 * @param {*} index 当前下标
 * @param {*} list 当前播放列表
 * @param {*} model 当前播放模式 1/顺序播放 2/随机播放 3/单曲循环
 * @param {*} type 1/上一曲 2/下一曲
 * @Description:
 */
export const cutSong = (index: any, list: [], model: number, type: number) => {
  let _index = index;
  const length = list.length - 1;
  if (length === -1) {
    message.destroy();
    message.info('当前无可以播放音乐,快去添加吧^v^');
    return false;
  }
  if (type === 1) {
    index--;
    _index = index === -1 ? length : index;
  } else {
    if (model === 2) {
      _index = Math.floor(Math.random() * length);
    } else {
      index++;
      _index = index === length + 1 ? 0 : index;
    }
  }
  return _index;
};

/**
 * @name: 防抖
 * @param {*}
 * @Description:
 */
let timeout: NodeJS.Timeout | null;
export const debounce = (cb: () => any, wait = 500) => {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(() => {
    timeout = null;
    cb && cb();
  }, wait);
};
