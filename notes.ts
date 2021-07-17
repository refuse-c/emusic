/*
 * @Author: REFUSE_C
 * @Date: 2021-06-12 09:03:02
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-17 11:08:02
 * @Description:
 */

/* 

targetId	banner type	targetId	banner type
"1"	"歌曲"	"1005"	"专题"
"10"	"专辑"	"1009"	"电台"
"100"	"艺人"	"2000"	"抽奖活动"
"1000"	"歌单"	"2001"	"熟人抢票"
"1001"	"电台节目"	"2003"	"歌单(webview)"
"1002"	"用户"	"2004"	"首发"
"1003"	"活动"	"3000"	"推广"
"1004"	"MV"	"3001"	"直播"
"-1004"	"明星访谈"	"4001"	"动态话题"

background: linear-gradient(to right, red 50%, blue 50%);



  通过blob预加载全部音频
  const blobLoad = (src: string) => {
    const req = new XMLHttpRequest();
    req.open('GET', src, true);
    req.responseType = 'blob';
    req.onload = function () {
      if (this.status === 200) {
        const blob = this.response;
        const blobSrc = URL.createObjectURL(blob);
        console.log(blobSrc);
  setUrl(blobSrc);
      }
    };
    req.onerror = function () {
  Error
    };
    req.send();
  };






*/
