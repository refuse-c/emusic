/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-28 20:24:09
 * @Description:音乐列表
 */
import { FC, useState, useContext } from 'react';
import { message, Table } from 'antd';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { formatSerialNumber, formatTime } from '@/common/utils/format';
import { _findIndex } from '@/common/utils/tools';
import ToggleLike from '@components/model/toggleLike';
import clone from 'clone';
interface Props {
  list?: any | [];
  loading?: boolean;
}

const MusicList: FC<Props> = (props) => {
  const { list, loading = false } = props;
  const [id, setId] = useState(0);
  const { songList, likeList, currentSong, setLike, dispatch } = useContext(Context);

  const handle = () => {
    const _index = _findIndex(list, currentSong.id);
    const contentDom = document.getElementById('content') as any;
    const headDomHeight = document.getElementById('head')?.clientHeight as any;
    const tableDom = document.getElementsByClassName('ant-table-tbody')[0].childNodes as any;
    if (contentDom && tableDom) contentDom.scrollTop = _index === -1 ? 0 : tableDom[_index].offsetTop + headDomHeight;
  };
  const columns = [
    {
      title: '',
      key: 'index',
      width: 110,
      render: (record: any, _text: any, index: number) => {
        return (
          <div className={styles.tools}>
            <span className={styles.serial}>{formatSerialNumber(index + 1)}</span>
            {likeList.includes(record.id) ? (
              <span onClick={() => setId(record.id)} style={{ color: '#EC4141' }} className="icon icon-like"></span>
            ) : (
              <span onClick={() => setLike(record.id, true)} className="icon icon-unlike"></span>
            )}
            <span style={{ marginLeft: 10 }} className="icon icon-list-download"></span>
          </div>
        );
      },
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
          {record.fee === 1 ? <i className={['icon icon-vip', styles.vip].join(' ')}></i> : null}
          {record.dl === 999000 ? <i className={['icon icon-sq', styles.sq].join(' ')}></i> : null}
          {record.mv !== 0 ? (
            <i onClick={() => console.log(record.mv)} className={['icon icon-mv', styles.mv].join(' ')}></i>
          ) : null}
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
  const setClassName = (record: { st: number; id: number }, index: number) => {
    const cls1 = record.st === -200 ? styles.disabled : '';
    const cls2 = index % 2 === 0 ? styles.even : styles.odd;
    const cls3 = record.id === currentSong.id || 0 ? styles.active : '';
    return [cls1, cls2, cls3].join(' ');
  };
  // 点击事件
  const selectRow = (record: { st: number; fee: number; id: number }) => {
    message.destroy();
    if (record.st === -200) {
      message.error('因合作方要求，该资源暂时下架');
    } else if (record.fee === 4) {
      message.error('版权方要求,当前专辑需单独付费,购买数字专辑即可无限畅享');
    } else {
      let cloneList = clone(songList);
      if (songList.length) {
        let index = _findIndex(songList, record.id);
        if (index === -1) {
          const currentIndex = _findIndex(songList, currentSong.id);
          cloneList.splice(currentIndex + 1, 0, record);
        }
      } else {
        cloneList = cloneList.concat(record);
      }
      dispatch({ type: 'songList', data: cloneList });
      dispatch({ type: 'currentSong', data: record });
    }
  };
  return (
    <div className={styles.musicList}>
      <ToggleLike id={id} hasShow={!!id} onClose={() => setId(0)} />
      <div id="point" className={styles.point} onClick={() => handle()}></div>
      <Table
        rowKey="id"
        size="small"
        bordered={false}
        dataSource={list}
        columns={columns}
        pagination={false}
        loading={loading}
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
