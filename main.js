/*
 * @Author: REFUSE_C
 * @Date: 2021-04-09 00:08:32
 * @LastEditors: REFUSE_C
 * @LastEditTime: 2021-05-26 12:11:26
 * @Description:
 */
const { app, BrowserWindow, globalShortcut } = require('electron');
// const path = require('path');
let mainWindow = null;
//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);
function makeSingleInstance() {
  if (process.mas) return;
  app.requestSingleInstanceLock();
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
function createWindow() {
  const windowOptions = {
    width: 1022, //指定窗口的宽度，单位: 像素值. 默认是 800
    height: 670, //指定窗口的高度，单位: 像素值,. 默认是 600
    // transparent: true, // 无框窗口透明 默认值为false
    center: true, //窗口是否在屏幕居中；true or false
    resizable: true, //窗口的大小是否可以；true or false，默认值为true
    movable: true, //窗口能否可以被移动；true or false，默认值为 true
    frame: false, //值为true或false, 表示是否创建无边框窗口，默认的程序窗口是带外壳的(标题栏，工具栏，边框等)
    show: true, //是否显示窗口
    kiosk: false, //是否使用kiosk模式。如果使用kiosk模式，应用程序将全屏显示，并且阻止用户离开应用。true or false
    // useContentSize: false,
    // webPreferences: {
    //   nodeIntegration: true,
    //   enablemotemodule: true
    // }
  };

  mainWindow = new BrowserWindow(windowOptions); // 加载窗口配置文件
  mainWindow.setMinimumSize(1022, 670); // 设置最小宽高
  mainWindow.webContents.closeDevTools();
  mainWindow.loadURL('http://localhost:3000/');
  // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
  //接收渲染进程的信息
  const ipc = require('electron').ipcMain;
  ipc.on('min', function () {
    mainWindow.minimize();
  });
  ipc.on('max', function () {
    mainWindow.maximize();
  });
  ipc.on('login', function () {
    mainWindow.maximize();
  });
  //如果是--debug 打开开发者工具，窗口最大化，
  if (debug) {
    mainWindow.webContents.openDevTools();
    require('devtron').install();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
makeSingleInstance();
//app主进程的事件和方法
app.on('ready', () => {
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('ready', () => {
  // 快捷键监听全局模式
  // 打开软件
  globalShortcut.register('Alt+X', () => {
    mainWindow.show();
  });
  // 最小化软件
  globalShortcut.register('Alt+Z', () => {
    mainWindow.minimize();
  });
  // 退出软件，测试期间使用
  globalShortcut.register('Alt+C', () => {
    app.exit();
  });
  // 进入调试模式
  globalShortcut.register('Alt+K', () => {
    mainWindow.webContents.openDevTools();
  });
  // 关闭调试模式
  globalShortcut.register('Alt+L', () => {
    mainWindow.webContents.closeDevTools();
  });
  // 刷新页面
  globalShortcut.register('Alt+Q', () => {
    mainWindow.reload();
  });
  // 音量+
  globalShortcut.register('Alt+Up', (even) => {
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
