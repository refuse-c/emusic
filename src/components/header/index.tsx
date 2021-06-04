/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 21:46:11
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-06-04 17:05:04
 * @Description:
 */
import { FC, useContext } from 'react';
import styles from './index.module.scss';
import { BlockPicker } from 'react-color';
import { createHashHistory } from 'history';
import { setLocal } from '@/common/utils/tools';
import { Context } from '@utils/context';
import { defaultColor } from '@/common/utils/local';
import SearchInput from '@components/searchInput';
const history = createHashHistory();
const DOM = document.getElementsByTagName('body')[0];
const Header: FC = () => {
  const { vipInfo, userInfo, globalColor, showModal, dispatch } = useContext(Context);
  DOM.style.setProperty('--color', globalColor, '');
  //  修改颜色
  const changeColor = (val: string) => {
    setLocal('color', val);
    DOM.style.setProperty('--color', val, '');
    dispatch({ type: 'globalColor', data: val });
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
          <p className="icon icon-back" onClick={() => history.go(-1)}></p>
          <p className="icon icon-back" onClick={() => history.go(+1)}></p>
        </div>
        <SearchInput />
        <div className={styles.general_song}>
          <p className="icon icon-mic-0603"></p>
        </div>
      </div>

      <ul className={styles.tool}>
        <li className={styles.author}>
          <img className={styles.avatarUrl} src={userInfo.avatarUrl} alt="" />
          <div className={styles.userInfo}>
            <p>{userInfo.nickname}</p>
            {vipInfo.vipType !== -1 ? (
              <img className={styles.redVipImageUrl} src={vipInfo.redVipImageUrl} alt="" />
            ) : (
              <p>去开通</p>
            )}
            <p className="icon icon-arrow-bottom"></p>
          </div>
        </li>
        <li
          className="icon icon-theme"
          onClick={(e) => {
            dispatch({ type: 'showModal', data: showModal === 'showColor' ? '' : 'showColor' });
            e.stopPropagation();
          }}
        ></li>
        <li className="icon icon-setting"></li>
        <li className="icon icon-mail"></li>
        <li className="icon icon-min"></li>
        <li className="icon icon-minimize"></li>
        <li className="icon  icon-max"></li>
        <li className="icon icon-close"></li>
      </ul>
    </div>
  );
};

export default Header;
