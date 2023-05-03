const { app, BrowserWindow, ipcMain} = require('electron');
const { setMainMenu } = require('./menu.js');
const path = require('path');
require('./src/Services/connection'); //Start the connection to the database
require('./src/Services/consult');

app.disableHardwareAcceleration(); // Disables hardware acceleration, eliminating a error

require('electron-reload')(__dirname); //reloads the app when a change is made

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

// Ventana del Login
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, './src/index.html'));
  
  setMainMenu(mainWindow);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// Ventana del home
const homeWindow = (userData) => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, './src/Views/home.html'));

  setMainMenu(mainWindow);
  
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

ipcMain.handle('login', (event, obj) => {  
  mainWindow.close();
  homeWindow(obj);
  mainWindow.show();
  
  mainWindow.webContents.once('dom-ready', ()=>{
    mainWindow.webContents.send('user-data', obj);
  })
});

ipcMain.handle('sign-out', (event, obj)=>{
  mainWindow.close();
  createWindow();
  mainWindow.show();
})

