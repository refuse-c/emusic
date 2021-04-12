/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-12 11:18:35
 * @Description:空组件
 */
import { FC } from 'react';

interface Props {
  title?: string;
}

const Empty: FC<Props> = (props) => {
  const { title } = props;
  return <div>{title}</div>;
};

export default Empty;
