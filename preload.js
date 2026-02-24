const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // BOTÕES DE JANELA
  minimize: () => ipcRenderer.send("minimize-window"),
  maximize: () => ipcRenderer.send("maximize-window"),
  close: () => ipcRenderer.send("close-window"),

  // LOGIN E OVERVIEW
  openOverview: (username) => ipcRenderer.send("open-overview", username),

  // CADASTRO DE USUÁRIOS
  openUserRegistration: () => ipcRenderer.send("open-user-registration"),

  // AUTO-UPDATER
  restartApp: () => ipcRenderer.send("restart-app"),
  openUpdateLink: () => ipcRenderer.send("open-update-link"),

  // EVENTOS RECEBIDOS DO MAIN
  onUpdateAvailable: (callback) => ipcRenderer.on("updateAvailable", (event, version) => callback(version)),
  onUpdateReady: (callback) => ipcRenderer.on("updateReady", callback),
  onUpdateProgress: (callback) => ipcRenderer.on("updateProgress", (event, progress) => callback(progress)),

  // RECEBER NOME DO USUÁRIO (overview)
  onUserName: (callback) => ipcRenderer.on("userName", (event, username) => callback(username)),
});