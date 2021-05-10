/*
 * @Author: REFUSE_C
 * @Date: 2021-05-10 16:01:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-10 16:09:27
 * @Description:
 */
import { FC } from 'react';
import { Modal } from 'antd';
import styles from './index.module.scss';

interface Props {
  title?: string;
  width?: number;
  height?: number;
  hasShow?: boolean;
  headView?: any;
  onClose?: any;
  contentView?: any;
}

const Title: FC<Props> = (props) => {
  const { title, width, height, hasShow, headView, onClose, contentView } = props;
  return (
    <Modal
      width={width}
      title={title}
      visible={hasShow}
      maskClosable={true}
      footer={null}
      onCancel={onClose && onClose}
      wrapClassName={`webModel`}
    >
      <div className={styles.contentbox} style={{ width: '100%', height: height || 'auto' }}>
        {headView}
        {contentView}
      </div>
    </Modal>
  );
};
export default Title;
