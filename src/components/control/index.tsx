/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-23 17:15:06
 * @Description:control
 */
import { FC } from 'react';
import styles from './index.module.scss';
interface Props {
  // title?: string;
}

const Control: FC<Props> = () => {
  // const { title } = props;
  return (
    <div className={styles.control}>
      <div className={styles.left}>
        <img className={styles.img_box} src={require('@images/icon_mask_layer4.png').default} alt="" />
        <div className={styles.info}>
          <div>
            <p>132132131231232132131</p>
            <p></p>
          </div>
          <div>132132131231232132131</div>
        </div>
      </div>
      <div className={styles.center}>
        <ul className={styles.btnGroup}>
          <li>model</li>
          <li>prev</li>
          <li>play</li>
          <li>next</li>
          <li>lyrc</li>
        </ul>
        <div className={styles.progress}>progress</div>
      </div>
      <div className={styles.right}>
        <div className={styles.quality}></div>
        <div className={styles.volume}></div>
        <div className={styles.list}></div>
      </div>
    </div>
  );
};

export default Control;
