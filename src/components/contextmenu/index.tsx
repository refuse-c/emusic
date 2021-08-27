/*
 * @Author: REFUSE_C
 * @Date: 2021-07-17 07:31:53
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-08-27 23:30:38
 * @Description:
 */
import { FC, useMemo, useContext, useCallback, useEffect, useState } from 'react';
import { ControlledMenu, MenuItem, SubMenu } from '@szhsin/react-menu'; // SubMenu
import '@szhsin/react-menu/dist/index.css';
import { Context } from '@utils/context';
import { _findIndex } from '@/common/utils/tools';
import clone from 'clone';
import { playlistTracks } from '@/common/net/playList';
import { message } from 'antd';
import { commentMusic } from '@/common/net/comment';
import copy from 'copy-to-clipboard';
import './index.scss';
interface Props {
  currentItem: any;
  menuProps: any;
  onClose: any;
  anchorPoint: { x: number; y: number };
}

interface Item {
  fun: () => void;
  icon: string;
  name: string;
  children: [];
}
const Contextmenu: FC<Props> = (props) => {
  const [commentTotal, setCommentTotal] = useState(0);
  const { anchorPoint = { x: 0, y: 0 }, currentItem, menuProps, onClose } = props;
  const { id = '' } = currentItem;
  const { createList, songList, currentSong, dispatch, getLikeIds, handleShare, userInfo } =
    useContext(Context);
  const { userId } = userInfo;

  // idNext为false时播放 为true时下一曲播放 默认为false
  const handlePlay = useCallback(
    (idNext = false) => {
      let cloneList = clone(songList);
      if (songList.length) {
        const index = _findIndex(songList, id);
        if (index === -1) {
          const currentIndex = _findIndex(songList, currentSong.id);
          cloneList.splice(currentIndex + 1, 0, currentItem);
        }
      } else {
        cloneList = cloneList.concat(currentItem);
      }
      dispatch({ type: 'songList', data: cloneList });
      !idNext && dispatch({ type: 'currentSong', data: currentItem });
    },
    [currentItem, currentSong.id, dispatch, id, songList]
  );

  // 复制链接
  const handleCopyLink = useCallback(() => {
    copy(`http://music.163.com/song?id=${id}&userid=${userId}`) && message.success('链接复制成功');
  }, [id, userId]);

  // 获取歌曲评论
  const handleCommentMusic = useCallback(async () => {
    const res: any = id && (await commentMusic({ id, limit: 1, offset: 0 }));
    if (res.code === 200) {
      setCommentTotal(res.total);
    }
  }, [id]);

  // 添加删除音乐到我的歌单
  const handlePlaylistTracks = useCallback(
    async (op, pid) => {
      const res: any = await playlistTracks({ op, pid, tracks: id });
      const { code, message: msg } = res.body;
      if (code === 200) {
        // Number(pid) === Number(myLikeId) &&
        getLikeIds(); // 刷新喜欢的列表
        op === 'add' && message.success('已收藏到歌单');
      } else {
        message.warning(msg);
      }
    },
    [id, getLikeIds]
  );

  // 过滤歌单
  const renderChild = useCallback(() => {
    return createList.map((item: { name: any; id: number }, index: any) => {
      return {
        name: item.name,
        key: index,
        fun: () => handlePlaylistTracks('add', item.id),
        icon: 'icon-ilike-01',
      };
    });
  }, [createList, handlePlaylistTracks]);

  // 渲染菜单列表
  const renderMenu = useCallback(
    (list) =>
      list.map((item: Item, index: number) => {
        const { fun, icon, name, children } = item;
        return children ? (
          <SubMenu label={name} key={index} className={() => `icon ${icon}`}>
            {renderMenu(children)}
          </SubMenu>
        ) : (
          <MenuItem onClick={fun} key={index} className={`icon ${icon}`}>
            {name}
          </MenuItem>
        );
      }),
    []
  );

  useEffect(() => {
    handleCommentMusic();
  }, [handleCommentMusic]);

  return useMemo(() => {
    const data = [
      {
        name: `查看评论${commentTotal ? `(${commentTotal})` : ''}`,
        key: 0,
        fun: () => message.info('开发中'),
        icon: 'icon-comment-01',
      },
      {
        name: '播放',
        key: 1,
        fun: () => handlePlay(),
        icon: 'icon-play-01',
      },

      {
        name: '下一首播放',
        key: 2,
        fun: () => handlePlay(true),
        icon: 'icon-next-01',
      },

      {
        name: '收藏到歌单',
        key: 3,
        children: renderChild(),
        icon: 'icon-collect-01',
      },
      {
        name: '分享',
        key: 4,
        fun: () => handleShare(id, 'song'),
        icon: 'icon-share-01',
      },
      {
        name: '复制链接',
        key: 5,
        fun: () => handleCopyLink(),
        icon: 'icon-copylink-01',
      },

      {
        name: '不感兴趣',
        key: 6,
        fun: () => message.info('开发中'),
        icon: 'icon-blacklist-01',
      },
      {
        name: '下载',
        key: 7,
        // children: renderChild(),
        fun: () => message.info('开发中'),
        icon: 'icon-download-01',
      },
      {
        name: '从歌单中删除',
        key: 8,
        // children: renderChild(),
        fun: () => message.info('开发中'),
        icon: 'icon-download-01',
      },
    ];
    return (
      <ControlledMenu className="menuList" anchorPoint={anchorPoint} {...menuProps} onClose={() => onClose()}>
        {renderMenu(data)}
      </ControlledMenu>
    );
  }, [
    id,
    commentTotal,
    renderChild,
    anchorPoint,
    menuProps,
    renderMenu,
    handlePlay,
    handleShare,
    handleCopyLink,
    onClose,
  ]);
};
export default Contextmenu;
