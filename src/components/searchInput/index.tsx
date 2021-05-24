/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-24 23:30:09
 * @Description:搜索框组件
 */
import { FC, useState, useEffect, useContext } from 'react';
import { Input } from 'antd';
import { debounce, trim } from '@/common/utils/tools';
import { createHashHistory } from 'history';
import { defaultVal } from '@/common/utils/local';
import { Context } from '@utils/context';
import { searchDefault, searchHotSuggest } from '@/common/net/search';
import styles from './index.module.scss';
const history = createHashHistory();
const SearchInput: FC = () => {
  const [keywords, setKeywords] = useState('');
  const [dfKeyWord, setDfKeyWord] = useState(defaultVal);
  const { dispatch } = useContext(Context);
  // 输入检索搜索建议
  const handleInput = (e: any) => {
    const keywords = trim(e.target.value, 't');
    setKeywords(keywords);
    debounce(() => keywords && getSearchHotSuggest(keywords), 500);
  };

  // 回车检索事件
  const onPressEnter = async () => {
    const _val = keywords ? keywords : dfKeyWord.realkeyword;
    setKeywords(_val);
    history.push('/search');
    debounce(() => getSearch(_val), 500);
  };

  // 搜索
  const getSearch = async (keywords: string) => {
    dispatch({ type: 'searchText', data: keywords });
  };

  //搜索建议
  const getSearchHotSuggest = async (keywords: string) => {
    const res: any = await searchHotSuggest({ keywords });
    console.log(res);
  };

  // 获取默认搜索关键字
  const getDefaultVal = async () => {
    const res: any = await searchDefault();
    console.log(res);
    const dfKeyWord = res.data || defaultVal;
    setDfKeyWord(dfKeyWord);
  };

  useEffect(() => {
    getDefaultVal();
    return () => {
      getDefaultVal();
    };
  }, []);
  return (
    <div className={styles.search}>
      <Input
        maxLength={30}
        value={keywords}
        onChange={(e) => handleInput(e)}
        onPressEnter={() => onPressEnter()}
        placeholder={dfKeyWord.showKeyword || '搜索'}
      />
    </div>
  );
};

export default SearchInput;
