const { app, BrowserWindow } = require("electron");
const path = require("path");
require("electron-reload")(path.join(__dirname, "style.css"), {
  electron: require(`${__dirname}/node_modules/electron`),
});

let win;

function createWindow() {
  win = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(createWindow);
