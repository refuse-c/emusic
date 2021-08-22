/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-22 23:14:43
 * @Description:搜索框组件
 */
import { useState, useEffect, useContext } from 'react';
import { Input } from 'antd';
import { debounce, jumpPage, trim } from '@/common/utils/tools';

import { DEFAULT_VAL } from '@/common/utils/constant';
import { Context } from '@utils/context';
import { searchDefault, searchHotSuggest } from '@/common/net/search';
import styles from './index.module.scss';
let timer: NodeJS.Timer | null;
const SearchInput = () => {
  const [keywords, setKeywords] = useState('');
  const [dfKeyWord, setDfKeyWord] = useState(DEFAULT_VAL);
  const { dispatch } = useContext(Context);
  // 输入检索搜索建议
  const handleInput = (e: any) => {
    const val = trim(e.target.value, 't');
    setKeywords(val);
    debounce(() => val && getSearchHotSuggest(val), 500);
  };

  // 回车检索事件
  const onPressEnter = async () => {
    let pathname = -1;
    const _val = keywords || dfKeyWord.showKeyword;
    setKeywords(_val);
    dispatch({ type: 'searchText', data: _val });
    pathname = window.location.href.indexOf('/search');
    if (pathname === -1) jumpPage('/search');
  };

  //搜索建议
  const getSearchHotSuggest = async (keywords: string) => {
    const res: any = await searchHotSuggest({ keywords });
    if (res.code === 200) {
      console.log(res);
    }
  };

  // 获取默认搜索关键字
  const getDEFAULT_VAL = async () => {
    const res: any = await searchDefault();
    if (res.code === 200) {
      const dfKeyWord = res.data || DEFAULT_VAL;
      setDfKeyWord(dfKeyWord);
    }
  };

  useEffect(() => {
    clearInterval(Number(timer));
    getDEFAULT_VAL();
    timer = setInterval(() => {
      getDEFAULT_VAL();
    }, 30 * 6 * 10000);
    return () => {
      clearInterval(Number(timer));
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
