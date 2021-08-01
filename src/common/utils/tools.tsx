/*
 * @Author: REFUSE_C
 * @Date: 2021-04-10 08:55:06
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-01 12:08:39
 * @Description:
 */

/** 是否是数组
 * @name:
 * @param {*} arr
 */
import { createHashHistory } from 'history';
import styles from '@common/css/index.module.scss';
import { message } from 'antd';
const history = createHashHistory();
// interface params {
//   list: [];
//   type: string;
//   index: number;
//   orderType: number;
// }

interface LRC {
  time: number;
  text: string;
}

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
export const renderArtists = (item: any) => {
  return (
    <div className={styles.artists}>
      {item.fee === 1 ? <i className={['icon icon-vip', styles.vip].join(' ')}></i> : null}
      {item.dl === 999000 ? <i className={['icon icon-sq', styles.sq].join(' ')}></i> : null}
      {item.mv !== 0 ? (
        <i onClick={() => console.log(item.mv)} className={['icon icon-mv', styles.mv].join(' ')}></i>
      ) : null}
      <div className={styles.artistsName}>
        {item.ar.map((item: Item, index: number) => {
          return (
            <span key={index} title={item.name}>
              {item.name}
            </span>
          );
        })}{' '}
      </div>
    </div>
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

/**
 * @name: 获取index
 * @param {*} list
 * @param {number} ele
 * @Description:
 */
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
 * @name: 歌词格式化
 * @param {string} lrc
 * @Description:
 */
export const parseLRC = (lrc: string): Array<LRC> => {
  const reg = /\[(\d+):(\d+)[.|:](\d+)\](.+)/;
  const regTime = /\[(\d+):(\d+)[.|:](\d+)\]/g;
  const regCompatible = /\[(\d+):(\d+)]()(.+)/;
  const regTimeCompatible = /\[(\d+):(\d+)]/g;
  const regOffset = /\[offset:\s*(-?\d+)\]/;
  const offsetMatch = lrc.match(regOffset);
  const offset = offsetMatch ? Number(offsetMatch[1]) : 0;
  const parsed: Array<LRC> = [];
  const matchAll = (line: string) => {
    const match = line.match(reg) || line.match(regCompatible);
    if (!match || match.length !== 5) return;
    const minutes = Number(match[1]) || 0;
    const seconds = Number(match[2]) || 0;
    const milliseconds = Number(match[3]) || 0;
    const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds + offset;
    const text = (match[4] as string).replace(regTime, '').replace(regTimeCompatible, '');

    // 优化：不要显示空行
    if (!text) return;
    parsed.push({ time, text });
    matchAll(match[4]); // 递归匹配多个时间标签
  };

  lrc
    .replace(/\\n/g, '\n')
    .split('\n')
    .forEach((line) => matchAll(line));

  if (parsed.length > 0) {
    parsed.sort((a, b) => a.time - b.time);
  }
  return parsed;
};

/**
 * @name: 获取当前歌词的index
 * @param {any} timeArr
 * @param {number} time
 * @Description:
 */
export const getTimeIndex = (timeArr: any | [], time: number) => {
  let timeIndex = 0;
  const length = timeArr.length;
  const currentTime = Number(time) + 0.2;
  for (let i = 0; i < length; i++) {
    if (timeArr[i].time >= currentTime * 1000) {
      timeIndex = i - 1;
      break;
    } else {
      timeIndex = i;
    }
  }
  return Number(timeIndex);
};

/**
 * @name: 高亮检索文字
 * @param {*} text  原文本
 * @param {*} searchText    检索文本
 * @Description:
 */
export const highlight = (text: string, searchText: string) => {
  return searchText.replace(new RegExp(text, 'gi'), (val: string) => `<span>${val}</span>`);
};

/**
 * @name: 跳转页面
 * @param {string} pathName
 * @Description:
 */
export const jumpPage = (pathName: string) => history.push(pathName);
