/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-24 23:24:36
 * @Description:搜索
 */
import { FC } from 'react';
import styles from './index.module.scss';
import Nav from '@components/nav';
import Content from '@components/view/content';
import { HashRouter as Router, Route } from 'react-router-dom';
import { searchNav } from '@utils/local';
const Search: FC = (props: any) => {
  const { router = [] } = props;
  // import { Context } from '@utils/context';
  // const [type, setType] = useState(1);
  // const { searchText } = useContext(Context);
  return (
    <div className={styles.search}>
      <Content padding={'0 30px'} isFull={true}>
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
