/*
 * @Author: REFUSE_C
 * @Date: 2021-06-23 15:09:52
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-16 18:15:04
 * @Description:
 */
import { FC, useState, useEffect } from 'react';
// import styles from './index.module.scss';
import { playlistSubscribers } from '@/common/net/playList';
import { Pagination } from 'antd';
import UserComponent from '@components/user';
import Content from '@components/view/content';
const limit = 100;
interface Props {
  id: string | number;
}

const Collectors: FC<Props> = (props) => {
  const { id } = props;
  const [data, setData] = useState<any>({});
  const [offset, setOffset] = useState(1);

  const getPlaylistSubscribers = async (id, offset) => {
    const res: any = await playlistSubscribers({ id, offset: (offset - 1) * 100, limit });
    console.log(res);
    if (res.code === 200) setData(res);
  };

  useEffect(() => {
    getPlaylistSubscribers(id, offset);
  }, [id, offset]);

  // 切换分页
  const onChange = (current: number) => setOffset(current);
  const list = data.subscribers || [];
  console.log(list);

  return (
    // <div className={styles.collectors}>
    <Content isFull={true} padding={'30px 0'}>
      <UserComponent list={list} />
      <Pagination
        size="small"
        pageSize={limit}
        total={data.total}
        showSizeChanger={false}
        hideOnSinglePage={true}
        current={offset}
        onChange={onChange}
      />
    </Content>
    // </div>
  );
};

export default Collectors;
