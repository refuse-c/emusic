/*
 * @Author: REFUSE_C
 * @Date: 2021-07-28 15:59:13
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-28 18:38:07
 * @Description:
 */
import { FC } from 'react';
import Title from '@components/title';
import { Anchor } from 'antd';
import '@common/css/index.module.scss';
import styles from './index.module.scss';
const { Link } = Anchor;

const Setting: FC = () => {
  return (
    <div className={styles.setting}>
      <div className={styles.sticky}>
        <Title title="设置" />
        <Anchor affix={false} getContainer={() => document.getElementById('contents') || window}>
          <Link href="#/setting/account" title="账号" />
          <Link href="#/setting/groove" title="常规" />
          <Link href="#/setting/play" title="播放" />
          <Link href="#/setting/msg" title="消息与隐私" />
          <Link href="#/setting/shortcuts" title="快捷键" />
          <Link href="#/setting/download" title="下载设置" />
          <Link href="#/setting/lrc" title="歌词" />
          <Link href="#/setting/tool" title="工具" />
          <Link href="#/setting/about" title="关于Emusic" />
        </Anchor>
      </div>
      <div className={styles.content} id="contents">
        <div id="/setting/account">account</div>
        <div id="/setting/groove">groove</div>
        <div id="/setting/play">play</div>
        <div id="/setting/msg">msg</div>
        <div id="/setting/shortcuts">shortcuts</div>
        <div id="/setting/download">download</div>
        <div id="/setting/lrc">lrc</div>
        <div id="/setting/tool">tool</div>
        <div id="/setting/about">about</div>
      </div>
    </div>
  );
};

export default Setting;
