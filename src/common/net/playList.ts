/*
 * @Author: REFUSE_C
 * @Date: 2021-04-27 22:38:10
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-27 22:38:54
 * @Description:
 */
import { get } from './request';

export const playlistTag = () => {
  return get('/playlist/aghhiilqtuy/tags');
};
