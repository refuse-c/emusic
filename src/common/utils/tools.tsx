/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-27 22:35:44
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
export const _findIndex = (list: [], ele: number | string) => {
  const _index = list.findIndex((item: { id: number }) => item.id === ele);
  return _index; // === -1 ? 0 : _index;
};

/**
 * @name: 去空格
 * @param {*} str
 * @param {*} type
 * a 去全部空格
 * t 去首尾空格
 * l 去左边空格
 * r 去右边空格
 */
export const trim = (str: string, type: string = 'a') => {
  switch (type) {
    case 't':
      return str.replace(/^\s+|\s+$/g, '');
    case 'l':
      return str.replace(/^\s*/, '');
    case 'r':
      return str.replace(/(\s*$)/g, '');
    default:
      return str.replace(/\s+/g, '');
  }
};

/**
 * @name:
 * @param {string} array 原歌词
 * @param {string} arr2 翻译后的歌词
 * @Description:
 */
export const parsingLyrics = (lyric: string = '') => {
  if (!lyric) {
    return { lyric: [{ time: 0, lyric: '这个地方没有歌词！' }] };
  }
  const lyricObjArr: any = []; // 最终生成的歌词数组

  // 将歌曲字符串变成数组，数组每一项就是当前歌词信息
  const lineLyric: any = lyric?.split(/\n/);

  // 匹配中括号里正则的
  const regTime = /\d{2}:\d{2}.\d{2,3}/;

  // 循环遍历歌曲数组
  for (let i = 0; i < lineLyric?.length; i++) {
    if (lineLyric[i] === '') continue;
    const time: number = formatLyricTime(lineLyric[i].match(regTime)[0]);

    if (lineLyric[i].split(']')[1]) {
      lyricObjArr.push({
        time: time,
        lyric: lineLyric[i].split(']')[1],
      });
    }
  }
  return {
    lyric: lyricObjArr,
  };
};

const formatLyricTime = (time: string) => {
  const regMin = /.*:/;
  const regSec = /:.*\./;
  const regMs = /\./;
  const min = parseInt((time.match(regMin) as any)[0].slice(0, 2));
  let sec = parseInt((time.match(regSec) as any)[0].slice(1, 3));
  const ms = time.slice((time.match(regMs) as any).index + 1, (time.match(regMs) as any).index + 3);
  if (min !== 0) {
    sec += min * 60;
  }
  return Number(sec + '.' + ms);
};

export const getTimeIndex = (timeArr, time) => {
  let timeIndex = -1;
  const length = timeArr.length;
  const currentTime = Number(time) + 0.2;
  for (let i = 0; i < length; i++) {
    if (timeArr[i].time >= currentTime) {
      timeIndex = i - 1;
      break;
    } else {
      timeIndex = i;
    }
  }
  return Number(timeIndex);
};
