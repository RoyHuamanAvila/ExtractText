const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("files", {
  readFiles: () => ipcRenderer.invoke("readFiles"),
});
