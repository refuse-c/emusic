/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-14 14:04:04
 * @Description:音乐列表
 */
import { FC } from 'react';
import { message, Table } from 'antd';
import styles from './index.module.scss';
import { formatSerialNumber, formatTime } from '@/common/utils/format';
interface Props {
  list?: any | [];
}

const columns = [
  {
    title: '',
    key: 'index',
    width: 50,
    render: (_record: any, _text: any, index: number) => (
      <span className={styles.serial}>{formatSerialNumber(index + 1)}</span>
    ),
  },
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
    render: (record: any) => <span className={styles.time}>{formatTime(record.dt)}</span>,
  },
];

// 控制样式
const setClassName = (record: { st: number }, index: number) => {
  const cls1 = record.st === -200 ? styles.disabled : '';
  const cls2 = index % 2 === 0 ? styles.even : styles.odd;
  return [cls1, cls2].join(' ');
};
// 点击事件
const selectRow = (record: { st: number; fee: number }) => {
  message.destroy();
  if (record.st === -200) {
    message.error('因合作方要求，该资源暂时下架');
  } else if (record.fee === 4) {
    message.error('版权方要求,当前专辑需单独付费,购买数字专辑即可无限畅享');
  } else {
    // const index = currentPlayList.findIndex((item) => item.id === record.id);
    // if (index === -1) {
    //   currentPlayList.unshift(record);
    // }
    // this.props.setCurrentPlayList(currentPlayList);
    // this.props.setCurrentPlayer(record);
  }

  /*     
      privilege.fee
      8、0：免费
      4：所在专辑需单独付费
      1：VIP可听
      privilege.cs: 云盘
      privilege.st：-200无版权
    */
};
const MusicList: FC<Props> = (props) => {
  const { list } = props;
  return (
    <div className={styles.musicList}>
      <Table
        rowKey="id"
        size="small"
        bordered={false}
        dataSource={list}
        columns={columns}
        pagination={false}
        className={styles.table}
        locale={{
          cancelSort: '', // 取消排序
          triggerAsc: '', // 点击升序
          triggerDesc: '', // 点击降序
          emptyText: '暂无数据',
        }}
        onRow={(record) => {
          return {
            onClick: () => {}, // 点击行
            onDoubleClick: () => selectRow(record),
          };
        }}
        rowClassName={(record, index) => setClassName(record, index)}
      />
    </div>
  );
};

export default MusicList;
