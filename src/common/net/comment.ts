/*
 * @Author: REFUSE_C
 * @Date: 2021-06-15 11:24:32
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-15 11:32:25
 * @Description: 评论api'
 */
import { get } from './request';


/**
 * @name: 视频评论 ( 不需要登录 )
 * @param {object} params
 * id: 视频的 id
 * limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const commentVideo = (params: { id: string | number; limit?: number; offset?: number; before?: number }) => {
  return get('/comment/video', params);
};
