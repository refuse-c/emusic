/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 21:46:11
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-14 15:39:21
 * @Description:
 */
import { FC, useContext, useState } from 'react';
import styles from './index.module.scss';
import { Input } from 'antd';
import { BlockPicker } from 'react-color';
import { createHashHistory } from 'history';
import { MyContext } from '@pages/app/context/context';
import { defaultColor } from '@/common/utils/local';
import { getLocal, setLocal } from '@/common/utils/tools';
const history = createHashHistory();
const globalColor = getLocal('color') || '#EC4141';
const DOM = document.getElementsByTagName('body')[0];
const Header: FC = () => {
  const { userInfo } = useContext(MyContext);
  const [color, setColor] = useState(globalColor);
  const [showPicker, setShowPicker] = useState(false);
  DOM.style.setProperty('--color', color, '');

  //  修改颜色
  const changeColor = (val: string) => {
    setColor(val);
    setLocal('color', val);
    DOM.style.setProperty('--color', val, '');
  };

  return (
    <div className={styles.header}>
      <div className={styles.colorContent}>
        {showPicker ? (
          <BlockPicker colors={defaultColor} color={color} onChange={(e: { hex: string }) => changeColor(e.hex)} />
        ) : null}
      </div>
      <div className={styles.left}>
        <div className={styles.back_group}>
          <p className="icon icon-back" onClick={() => history.go(-1)}></p>
          <p className="icon icon-back" onClick={() => history.go(+1)}></p>
        </div>
        <div className={styles.search}>
          <Input placeholder="搜索" />
        </div>
        <div className={styles.general_song}>
          <p className="icon icon-general-song"></p>
        </div>
      </div>
      <ul className={styles.tool}>
        <li className={styles.author} style={{ backgroundImage: `url(${userInfo.avatarUrl})` }}></li>
        <li className="icon">
          {userInfo.nickname} <span></span>
        </li>
        <li className="icon icon-theme" onClick={() => setShowPicker(!showPicker)}></li>
        <li className="icon icon-setting"></li>
        <li className="icon icon-email"></li>
        <li className="icon icon-min"></li>
        <li className="icon icon-minimize"></li>
        <li className="icon icon-amplification"></li>
        <li className="icon icon-close"></li>
      </ul>
    </div>
  );
};

export default Header;
