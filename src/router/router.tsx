/*
 * @Author: REFUSE_C
 * @Date: 2021-04-08 00:03:41
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-04-08 22:17:47
 * @Description:
 */
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// import { Login, Layout, routerList, NotFound } from "src/router/index";
// 需要给路由提供一个 接口
// interface Props extends RouteComponentProps {}

const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch></Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
