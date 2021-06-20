/*
 * @Author: REFUSE_C
 * @Date: 2021-06-16 12:57:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-18 00:02:19
 * @Description: 视频
 */
import { FC, useState, useEffect } from 'react';
import styles from '../index.module.scss';
import VideoComponent from '@components/video';
import Tags from '@components/tags';
import { videoCategoryTag, videoGroup, videoTimelineAll } from '@/common/net/video';

const Video: FC = () => {
  const [tag, setTag] = useState('全部视频');
  const [tagList, setTagList] = useState([]);
  const [videoList, setVideoList] = useState({
    msg: '',
    code: 200,
    datas: [],
    hasmore: false,
    rcmdLimit: 0,
  });

  // 获取热门tag
  const getVideoTag = async () => {
    const res: any = await videoCategoryTag({});
    if (res.code === 200) setTagList(res.data || []);
  };

  // 获取全部视频
  const getAllVideo = async () => {
    const res: any = await videoTimelineAll({});
    if (res.code === 200) setVideoList(res);
  };

  //获取对应tag下的视频
  const getVideoGroup = async (id: number) => {
    const res: any = await videoGroup({ id });
    if (res.code === 200) setVideoList(res);
  };

  const changeTag = (item: any) => {
    setTag(item.name);
    getVideoGroup(item.id);
  };

  useEffect(() => {
    getVideoTag();
    getAllVideo();
  }, []);
  return (
    <div className={styles.video}>
      <Tags tag={tag} list={tagList} changeTag={(tag: any) => changeTag(tag)} showCallBack={() => console.log(1111)} />
      <VideoComponent list={videoList.datas || []} type={1} />
    </div>
  );
};

export default Video;
