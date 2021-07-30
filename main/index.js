/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 00:08:32
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-07-29 00:13:51
 * @Description:
 */
const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow = null;
// function makeSingleInstance() {
//   if (process.mas) return;
//   app.requestSingleInstanceLock();
//   app.on('second-instance', () => {
//     if (mainWindow) {
//       if (mainWindow.isMinimized()) mainWindow.restore();
//       mainWindow.focus();
//     }
//   });
// }
function createWindow() {
  const windowOptions = {
    width: 1022, //指定窗口的宽度
    height: 670, //指定窗口的高度
    // transparent: true, // 无框窗口透明 默认值为false
    center: true, // 窗口是否在屏幕居中；
    frame: false, // 是否创建无边框窗口，
    show: true, // 是否显示窗口
    kiosk: false, // 应用程序将全屏显示，并且阻止用户离开应用。
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  };
  mainWindow = new BrowserWindow(windowOptions); // 加载窗口配置文件
  mainWindow.setMinimumSize(1022, 670); // 设置最小宽高
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/../build/index.html`);
  isDev && mainWindow.webContents.openDevTools();
  app.on('window-all-closed', () => app.quit());
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.on('maximize', () => mainWindow.webContents.send('maximize'));
  mainWindow.on('unmaximize', () => mainWindow.webContents.send('unmaximize'));
}

// makeSingleInstance();

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });

app.on('ready', () => {
  //app主进程的事件和方法
  createWindow();
  // 快捷键监听全局模式
  // 打开软件
  globalShortcut.register('Alt+X', () => {
    mainWindow.show();
  });
  // 最小化软件
  globalShortcut.register('Alt+M', () => {
    mainWindow.minimize();
  });
  // 退出软件，测试期间使用
  globalShortcut.register('Alt+F4', () => {
    app.exit();
  });
  // 进入调试模式
  globalShortcut.register('Alt+K', () => {
    isDev && mainWindow.webContents.openDevTools();
  });
  // 关闭调试模式
  globalShortcut.register('Alt+L', () => {
    isDev && mainWindow.webContents.closeDevTools();
  });
  // 刷新页面
  globalShortcut.register('Alt+Q', () => {
    isDev && mainWindow.reload();
  });
  // 音量+
  globalShortcut.register('Alt+Up', () => {
    mainWindow.webContents.send('Up', 'Up');
  });
  // 音量-
  globalShortcut.register('Alt+Down', () => {
    mainWindow.webContents.send('Down', 'Down');
  });
  // 上一曲
  globalShortcut.register('Alt+Left', () => {
    mainWindow.webContents.send('Left', 'Left');
  });
  // 下一曲
  globalShortcut.register('Alt+Right', () => {
    mainWindow.webContents.send('Right', 'Right');
  });
  // 播放/暂停
  globalShortcut.register('Alt+Space', () => {
    mainWindow.webContents.send('Space', 'Space');
  });
});

module.exports = mainWindow;
