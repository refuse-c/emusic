/*
 * @Author: REFUSE_C
 * @Date: 2021-05-10 16:01:12
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-18 23:52:44
 * @Description:
 */
import { FC } from 'react';
import { Modal } from 'antd';
import styles from './css/index.module.scss';

interface Props {
  title?: string;
  width?: number;
  height?: number;
  hasShow?: boolean;
  onClose?: any;
  contentView?: any;
}

const BoxModel: FC<Props> = (props) => {
  const { title, width, height, hasShow, onClose, children } = props;
  return (
    <Modal
      destroyOnClose
      centered={true}
      mask={false}
      width={width}
      title={title}
      visible={hasShow}
      maskClosable={true}
      footer={null}
      onCancel={onClose && onClose}
      wrapClassName={`webModel`}
    >
      <div
        className={styles.contentbox}
        style={{ width: '100%', height: height || 'auto' }}
      >
        {children}
      </div>
    </Modal>
  );
};
export default BoxModel;
