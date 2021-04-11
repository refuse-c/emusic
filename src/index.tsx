/*
 * @Author: REFUSE_C
 * @Date: 2021-04-07 23:41:03
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-11 14:46:13
 * @Description:
 */

import { render } from 'react-dom';
import 'antd/dist/antd.css';
import 'reset.css';
import { message } from 'antd';
// import Router from "./router/router";
import App from '@pages/app';
message.config({ maxCount: 1 });
const root: HTMLElement | null = document.getElementById('root');
render(<App />, root);
