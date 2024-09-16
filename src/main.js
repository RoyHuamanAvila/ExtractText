const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { readFiles, extractTextFromImage } = require("./utils");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const filePath = path.join(__dirname, "index.html");
  win.loadFile(filePath);
};

app.whenReady().then(() => {
  ipcMain.handle("readFiles", readFiles);
  ipcMain.handle("extractTextFromImage", extractTextFromImage);
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
