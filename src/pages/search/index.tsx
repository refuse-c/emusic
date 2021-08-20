/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-26 22:19:10
 * @Description:搜索
 */
import { FC, useContext } from 'react';
import styles from './index.module.scss';
import Nav from '@components/nav';
import Content from '@components/view/content';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Context } from '@utils/context';
import { searchNav } from '@/common/utils/constant';
const Search: FC = (props: any) => {
  const { router = [] } = props;
  // const [type, setType] = useState(1);
  const { searchInfo } = useContext(Context);
  const { total, type } = searchInfo;
  const renderText = (total: number, type: number) => {
    const _index = searchNav.findIndex((item) => item.type === type);
    const data = searchNav[_index];
    if (_index !== -1) return `找到${total + data.unit + data.name}`;
  };

  return (
    <div className={styles.search}>
      <Content padding={'30px 30px 0'} isFull={true}>
        <div className={styles.total}>{renderText(total, type)}</div>
        <Nav list={searchNav} cls="smell" isFixed={true} />
      </Content>
      <Router>
        {router.map((item: any, index: number) => (
          <Route
            exact
            key={index}
            path={item.path}
            render={(props) => <item.component {...props} router={item.router} />}
          />
        ))}
      </Router>
    </div>
  );
};

export default Search;
