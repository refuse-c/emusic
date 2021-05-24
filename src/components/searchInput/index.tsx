/*
 * @Author: REFUSE_C
 * @Date: 2021-04-12 11:16:04
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-24 12:19:35
 * @Description:搜索框组件
 */
import { FC, useState, useEffect } from 'react';
import { Input } from 'antd';
import { debounce, trim } from '@/common/utils/tools';
import { search, searchDefault, searchHotSuggest } from '@/common/net/search';
import { defaultVal } from '@/common/utils/local';

import styles from './index.module.scss';
const SearchInput: FC = () => {
  const [type, setType] = useState(1);
  const [keywords, setKeywords] = useState('');
  const [dfKeyWord, setDfKeyWord] = useState(defaultVal);
  // 输入检索搜索建议
  const handleInput = (e: any) => {
    const keywords = trim(e.target.value, 't');
    setKeywords(keywords);
    debounce(() => getSearchHotSuggest(keywords), 500);
  };

  // 回车检索事件
  const onPressEnter = async () => {
    if (!keywords) {
      setType(1);
    }
    const _val = keywords ? keywords : dfKeyWord.realkeyword;
    setKeywords(_val);
    debounce(() => getSearch(_val), 500);
  };

  // 搜索
  const getSearch = async (keywords: string) => {
    const params = { type, keywords };
    console.log(params);
    const res: any = await search({ ...params });
    console.log(res);
  };

  //搜索建议
  const getSearchHotSuggest = async (keywords) => {
    const res: any = await searchHotSuggest({ keywords });
    console.log(res);
  };

  // 获取默认搜索关键字
  const getDefaultVal = async () => {
    const res: any = await searchDefault();
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
