/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-14 00:10:11
 * @Description:音乐列表
 */
import { FC } from 'react';
import { Table } from 'antd';
import styles from './index.module.scss';
import { formatTime } from '@/common/utils/format';
interface Props {
  list?: any | [];
}

const columns = [
  // {
  //   title: '姓名',
  //   dataIndex: 'name',
  //   key: 'name',
  //   render: (record: any, text: any, index: number) => {
  //     console.log(record, text, index);
  //   },
  // },
  {
    title: '音乐标题',
    key: 'name',
    ellipsis: true,
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    render: (record: any) => (
      <div className={styles.name}>
        <p
        // dangerouslySetInnerHTML={{
        //   __html: highlightText(this.props.keywords, item.name),
        // }}
        >
          {record.name}
        </p>
        {record.fee === 1 ? <i className={styles.vip}></i> : null}
        {record.dl === 999000 ? <i className={styles.sq}></i> : null}
        {record.mv !== 0 ? <i onClick={() => console.log(record.mv)} className={styles.mv}></i> : null}
      </div>
    ),
  },
  {
    title: '歌手',
    key: 'singer',
    ellipsis: true,
    sorter: (a: any, b: any) => a.ar[0].name.localeCompare(b.ar[0].name),
    render: (record: any) =>
      record.ar.map((item: any, index: number) => (
        <span key={index} className={styles.singer}>
          {item.name}
        </span>
      )),
  },
  {
    title: '专辑',
    key: 'album',
    ellipsis: true,
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    render: (record: any) => <span className={styles.album}>{record.al.name}</span>,
  },
  {
    title: '时长',
    key: 'dt',
    width: 80,
    sorter: (a: any, b: any) => a.dt - b.dt,
    render: (record: any) => formatTime(record.dt),
  },
];

const MusicList: FC<Props> = (props) => {
  const { list } = props;
  console.log(list);

  return (
    <div className={styles.musicList}>
      <Table
        size="small"
        dataSource={list}
        columns={columns}
        pagination={false}
        locale={{
          cancelSort: '', // 取消排序
          triggerAsc: '', // 点击升序
          triggerDesc: '', // 点击降序
        }}
      />
    </div>
  );
};

export default MusicList;
