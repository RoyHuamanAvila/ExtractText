const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("files", {
  readFiles: (text) => ipcRenderer.invoke("readFiles", text),
  extractTextFromImage: () => ipcRenderer.invoke("extractTextFromImage"),
});
