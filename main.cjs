const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let view;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 850,
    width: 1400,
    titleBarStyle: 'hidden',
    transparent: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  // ipcMain.on('load-url', (event, url) => {
  //   if (!view) {
  //     view = new BrowserView();
  //     mainWindow.setBrowserView(view);
  //   }

  //   view.setBounds({ x: 0, y: 100, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 100 });
  //   view.setAutoResize({ width: true, height: true });

  //   view.webContents.loadURL(url);
  //   view.webContents.openDevTools();
  // });

  // mainWindow.on('resize', () => {
  //   if (view) {
  //     view.setBounds({ x: 0, y: 100, width: mainWindow.getBounds().width, height: mainWindow.getBounds().height - 100 });
  //   }
  // });
};

app.whenReady().then(createWindow);
