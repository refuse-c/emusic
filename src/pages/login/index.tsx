/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-19 20:21:19
 * @Description:密码登录
 */
import { FC, useState } from 'react';
import styles from './index.module.scss';
import BoxModel from '@components/model/BoxModel';
import Qrcode from '@pages/login/qrcode';
import Pwd from '@pages/login/pwd';
import Mail from '@pages/login/mail';

interface Props {
  hasShow?: boolean;
  onClose?: any;
  onFinish?: any;
}

const Login: FC<Props> = (props) => {
  const [type, setType] = useState(1);
  const { hasShow, onClose } = props;
  return (
    <BoxModel hasShow={hasShow} onClose={onClose} width={350} height={530}>
      <div className={styles.login}>
        {type === 1 && <Pwd setType={setType} />}
        {type === 2 && <Qrcode setType={setType} />}
        {type === 3 && <Mail setType={setType} />}
      </div>
    </BoxModel>
  );
};

export default Login;
