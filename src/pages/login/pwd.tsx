/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-19 23:32:02
 * @Description:密码登录
 */
import { login } from '@/common/net/login';
import { FC, useContext } from 'react';
import { Tooltip, Form, Input, Button, message } from 'antd';
import styles from './index.module.scss';
import { Context } from '@utils/context';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { trim } from '@/common/utils/tools';
const { Item } = Form;
const { Password } = Input;
interface Props {
  setType: (v: number) => void;
}

const Pwd: FC<Props> = (props) => {
  const { setType } = props;
  const { queryStatus } = useContext(Context);
  // 登录
  const getLogin = async (param) => {
    const res: any = await login({ ...param });
    if (res.code === 200) {
      message.success('登录成功');
      queryStatus();
    }
  };

  const onFinish = (values) => {
    console.log(values);
    getLogin(values);
  };

  return (
    <div className={styles.pwd}>
      <Tooltip placement="rightTop" title={'扫码登录更安全'} visible={true} align={{ offset: [-14, 10] }}>
        <div className={styles.qr} onClick={() => setType(2)}></div>
      </Tooltip>
      <div className={styles.bg}></div>
      <Form
        name="basic"
        size="middle"
        initialValues={{ remember: true }}
        className={styles.form}
        onFinish={onFinish}
      >
        <Item
          name="phone"
          rules={[
            { required: true, message: '请输入手机号码' },
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
              message: '请输入11位数字的手机号',
              validateTrigger: 'onBlur',
            },
          ]}
          getValueFromEvent={(e) => e.target.value.replace(/[^\d]/g, '')}
        >
          <Input maxLength={11} prefix={<UserOutlined className="site-form-item-icon" />} />
        </Item>

        <Item
          name="password"
          rules={[
            { required: true, message: '请输入登录密码' },
            {
              pattern: /^[\s\S]{6,16}$/,
              message: '请输入6到16位密码',
              validateTrigger: 'onBlur',
            },
          ]}
          getValueFromEvent={(e) => trim(e.target.value)}
        >
          <Password maxLength={16} prefix={<LockOutlined className="site-form-item-icon" />} />
        </Item>

        {/* <Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Item> */}

        <Item>
          <Button block={true} type="primary" htmlType="submit">
            登录
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default Pwd;
