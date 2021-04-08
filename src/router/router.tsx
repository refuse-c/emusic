/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 00:03:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-08 00:12:34
 * @Description:
 */
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
// import { Login, Layout, routerList, NotFound } from "src/router/index";
// 需要给路由提供一个 接口
// interface Props extends RouteComponentProps {}
interface Props {}
const AppRouter = (props: Props) => {
  return (
    <Router>
      <div>
        <Switch></Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
