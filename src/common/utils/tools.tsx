/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-14 14:36:00
 * @Description:
 */

/** 是否是数组
 * @name:
 * @param {*} arr
 */
import styles from '@common/css/index.module.scss';

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
