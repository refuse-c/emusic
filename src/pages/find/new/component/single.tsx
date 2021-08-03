/*
 * @Author: REFUSE_C
 * @Date: 2021-08-03 15:54:34
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-03 17:12:10
 * @Description:
 */
import { formatImgSize, formatTime } from '@/common/utils/format';
import { Table } from 'antd';
import { FC } from 'react';
interface Props {
  list?: [];
}

const columns = [
  {
    title: '序号',
    key: 'index',
    render: (_text, _record, index) => index + 1,
  },
  {
    title: '专辑图',
    key: 'picUrl',
    dataIndex: 'al',
    render: (text) => <img src={formatImgSize(text.picUrl, 60, 60)} alt="" />,
  },
  {
    title: '名字',
    key: 'name',
    dataIndex: 'name',
    // render: (record) => record.name,
  },
  {
    title: '专辑名字',
    key: 'al',
    dataIndex: 'al',
    render: (text) => text.name,
  },
  {
    title: '歌手名字',
    key: 'ar',
    dataIndex: 'ar',
    render: (text) => text.map((item) => item.name),
  },
  {
    title: '时长',
    key: 'dt',
    dataIndex: 'dt',
    render: (text) => formatTime(text),
  },
];

const Empty: FC<Props> = (props) => {
  const { list } = props;
  return (
    <Table
      rowKey="id"
      size="small"
      bordered={false}
      dataSource={list}
      columns={columns}
      pagination={false}
      // loading={loading}
      showHeader={false}
    />
  );
};

export default Empty;
