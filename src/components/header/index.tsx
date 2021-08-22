/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 21:46:11
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-22 23:06:51
 * @Description:
 */
import { FC, useContext, useState } from 'react';
import styles from './index.module.scss';
import { BlockPicker } from 'react-color';
import { history, jumpPage, reLocalAll, setLocal } from '@/common/utils/tools';
import { Context } from '@utils/context';
import { DEFAULT_COLOR, INIT_SONG, INI_TUSER_INFO } from '@/common/utils/constant';
import SearchInput from '@/components/search-Input';
import { formatImgSize } from '@/common/utils/format';
import { message } from 'antd';
import { logout } from '@/common/net/login';
import img from '@images/user.png';
const { remote, ipcRenderer } = window.require('electron');

const win = remote.getCurrentWindow();

const DOM = document.getElementsByTagName('body')[0] as HTMLElement;
const Header: FC = () => {
  const [isMaximized, setIsMaximized] = useState(win.isMaximized());
  const { vipInfo, userInfo, globalColor, showModal, showPlayer, dispatch } = useContext(Context);
  const { userId, nickname } = userInfo;
  DOM.style.setProperty('--color', globalColor, '');
  //  修改颜色
  const changeColor = (val: string) => {
    setLocal('color', val);
    DOM.style.setProperty('--color', val);
    dispatch({ type: 'globalColor', data: val });
  };

  // 监听是否是全屏
  ipcRenderer.on('maximize', () => setIsMaximized(true));
  ipcRenderer.on('unmaximize', () => setIsMaximized(false));

  // 点击前进后退
  const handleHistory = (num) => {
    showPlayer ? dispatch({ type: 'showPlayer', data: false }) : history.go(num);
  };
  return (
    <div className={styles.header}>
      <div className={styles.colorContent} onClick={(e) => e.stopPropagation()}>
        {showModal === 'showColor' ? (
          <BlockPicker
            colors={DEFAULT_COLOR}
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
            src={formatImgSize(userInfo.avatarUrl, 30, 30) || img}
            alt=""
            onClick={() => {
              nickname ? jumpPage(`/user${userId}`) : dispatch({ type: 'showLogin', data: true });
            }}
          />
          <div className={styles.userInfo}>
            {nickname ? (
              <p>{nickname}</p>
            ) : (
              <p
                onClick={() => {
                  dispatch({ type: 'showLogin', data: true });
                }}
              >
                未登录
              </p>
            )}
            {vipInfo.vipType > 0 ? (
              <img
                className={styles.redVipImageUrl}
                src={formatImgSize(vipInfo.redVipImageUrl, 36, 12)}
                alt=""
              />
            ) : (
              <p>{nickname ? '去开通' : '开通VIP'}</p>
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
        <li className="icon icon-setting" onClick={() => jumpPage('/setting')}></li>
        <li
          className="icon icon-mail"
          onClick={async () => {
            const res: any = await logout();
            const { code } = res;
            if (code === 200) {
              reLocalAll();
              message.info('退出成功');

              dispatch({ type: 'likeList', data: [] });
              dispatch({ type: 'songList', data: [] });
              dispatch({ type: 'playList', data: [] });
              dispatch({ type: 'createList', data: [] });
              dispatch({ type: 'myLikeId', data: '' });
              dispatch({ type: 'showModal', data: '' });
              dispatch({ type: 'showPlayer', data: false });
              dispatch({
                type: 'vipInfo',
                data: { redVipImageUrl: '', level: 0, vipType: -1 },
              });
              dispatch({ type: 'vipType', data: -1 });
              dispatch({ type: 'currentSong', data: INIT_SONG });
              dispatch({ type: 'userInfo', data: INI_TUSER_INFO });
              dispatch({ type: 'globalColor', data: '#EC4141' });
              dispatch({ type: 'showLogin', data: false });
              jumpPage('/find');
            }
          }}
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
