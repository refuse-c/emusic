/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-19 22:34:36
 * @Description:扫码登录
 */
import { FC, useEffect, useState, useContext, useCallback } from 'react';
import { qrCheck, qrCreate, qrKey } from '@/common/net/login';
import styles from './index.module.scss';
import { message } from 'antd';
import { Context } from '@utils/context';
import img from '@images/bg1.png';
const { shell } = require('electron');

interface Props {
  setType: (v: number) => void;
}

let T1: NodeJS.Timeout;
const Qrcode: FC<Props> = (props) => {
  const { setType } = props;
  const [key, setKey] = useState('');
  const [qrurl, setQrurl] = useState('');
  const [code, setcode] = useState(null);
  const { queryStatus } = useContext(Context);
  // 获取二维码key
  const getQrKey = async () => {
    const res: any = await qrKey();
    setKey(res.data.unikey || '');
  };

  // 获取二维码
  const getQrImg = async (key: string) => {
    const res: any = await qrCreate({ key, qrimg: true });
    const url = res.data.qrimg;
    setQrurl(url);
  };

  // 检查二维码是否可用
  const checkQrImg = useCallback(
    async (key: string) => {
      const res: any = await qrCheck({ key });
      console.log(res);
      const { code } = res;
      setcode(code);
      switch (code) {
        case 800:
          clearInterval(T1);
          return message.info('二维码过期');
        case 801:
          return;
        case 802:
          return message.info('等待确认');
        case 803:
          clearInterval(T1);
          message.success('登录成功');
          queryStatus();
          break;
      }
    },
    [queryStatus]
  );

  useEffect(() => {
    getQrKey();
  }, []);
  useEffect(() => {
    getQrImg(key);
    clearInterval(T1);
    T1 = setInterval(() => {
      checkQrImg(key);
    }, 1000);
    return () => clearInterval(T1);
  }, [checkQrImg, key]);

  const backgroundImage = `url(${code === 802 ? img : qrurl})`;
  return (
    <div className={styles.qrcode}>
      <h2>扫码登录</h2>
      <div className={styles.qr} style={{ backgroundImage }}>
        {code === 800 && (
          <div className={styles.failure}>
            <p>二维码失效</p>
            <button onClick={() => getQrKey()}>点击刷新</button>
          </div>
        )}
        {code === 802 && <div className={styles.success}>扫描成功</div>}
      </div>
      <div className={styles.title}>
        {code === 802 ? (
          '请在手机上确认'
        ) : (
          <>
            使用
            <span onClick={() => shell.openExternal('https://music.163.com/#/download')}>网易云音乐APP</span>
            扫码登录
          </>
        )}
      </div>
      <div className={styles.switch} onClick={() => setType(1)}>
        选择其他登录模式
      </div>
    </div>
  );
};

export default Qrcode;
