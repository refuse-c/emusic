/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-24 14:54:37
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
        <ul className={styles.btn_group}>
          <li className="icon icon-cycle"></li>
          <li className="icon icon-prev"></li>
          <li className="icon icon-pause"></li>
          <li className="icon icon-next"></li>
          <li>lyrc</li>
        </ul>
        <div className={styles.progress_box}>
          <p className={styles.time}>00:00</p>
          <p className={styles.progress}></p>
          <p className={styles.time}>04:36</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.quality}></div>
        <div className={styles.volume}></div>
        <div className={[styles.aa, 'icon icon-playlist'].join(' ')}></div>
      </div>
    </div>
  );
};

export default Control;
