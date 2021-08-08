/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 21:46:11
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-04 17:10:28
 * @Description:
 */
import { FC, useContext, useState } from 'react';
import styles from './index.module.scss';
import { BlockPicker } from 'react-color';
import { createHashHistory } from 'history';
import { jumpPage, setLocal } from '@/common/utils/tools';
import { Context } from '@utils/context';
import { defaultColor } from '@/common/utils/local';
import SearchInput from '@/components/search-Input';
import { formatImgSize } from '@/common/utils/format';
import { message } from 'antd';
const { remote, ipcRenderer } = window.require('electron');

const win = remote.getCurrentWindow();
const history = createHashHistory();
const DOM = document.getElementsByTagName('body')[0] as HTMLElement;
const Header: FC = () => {
  const [isMaximized, setIsMaximized] = useState(win.isMaximized());
  const { vipInfo, userInfo, globalColor, showModal, showPlayer, dispatch } =
    useContext(Context);
  const { userId, nickname } = userInfo;
  DOM.style.setProperty('--color', globalColor, '');
  //  修改颜色
  const changeColor = (val: string) => {
    setLocal('color', val);
    DOM.style.setProperty('--color', val, '');
    dispatch({ type: 'globalColor', data: val });
  };

  // 监听是否是全屏
  ipcRenderer.on('maximize', () => setIsMaximized(true));
  ipcRenderer.on('unmaximize', () => setIsMaximized(false));

  // 点击前进后退
  const handleHistory = (num) => {
    showPlayer
      ? dispatch({ type: 'showPlayer', data: false })
      : history.go(num);
  };
  return (
    <div className={styles.header}>
      <div className={styles.colorContent} onClick={(e) => e.stopPropagation()}>
        {showModal === 'showColor' ? (
          <BlockPicker
            colors={defaultColor}
            color={globalColor}
            onChange={(e: { hex: string }) => changeColor(e.hex)}
          />
        ) : null}
      </div>
      <div className={styles.left}>
        <div className={styles.back_group}>
          <p className="icon icon-right" onClick={() => handleHistory(-1)}></p>
          <p className="icon icon-right" onClick={() => handleHistory(+1)}></p>
        </div>
        <SearchInput />
        <div className={styles.general_song}>
          <p className="icon icon-mic-0603"></p>
        </div>
      </div>

      <ul className={styles.tool}>
        <li className={styles.author}>
          <img
            className={styles.avatarUrl}
            src={formatImgSize(userInfo.avatarUrl, 30, 30)}
            alt=""
            onClick={() => {
              jumpPage(`/user${userId}`);
            }}
          />
          <div className={styles.userInfo}>
            <p>{nickname}</p>
            {vipInfo.vipType > 0 ? (
              <img
                className={styles.redVipImageUrl}
                src={formatImgSize(vipInfo.redVipImageUrl, 36, 12)}
                alt=""
              />
            ) : (
              <p>去开通</p>
            )}
            <p className="icon icon-arrow-bottom"></p>
          </div>
        </li>
        <li
          className="icon icon-theme"
          onClick={(e) => {
            dispatch({
              type: 'showModal',
              data: showModal === 'showColor' ? '' : 'showColor',
            });
            e.stopPropagation();
          }}
        ></li>
        <li
          className="icon icon-setting"
          onClick={() => jumpPage('/setting')}
        ></li>
        <li
          className="icon icon-mail"
          onClick={() => message.info('开发中...')}
        ></li>
        {/* <li className="icon icon-min"></li> */}
        <li className="icon icon-minimize" onClick={() => win.minimize()}></li>
        <li
          className={`icon ${isMaximized ? 'icon-quanping-0615' : 'icon-max'}`}
          onClick={() => (isMaximized ? win.restore() : win.maximize())}
        ></li>
        <li className="icon icon-close" onClick={() => win.close()}></li>
      </ul>
    </div>
  );
};

export default Header;
