const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")
const { autoUpdater } = require("electron-updater")

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    transparent: true,
    vibrancy: "under-window", // efeito glass no Mac
    backgroundColor: "#00000000", // fundo transparente
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile("login.html")

  mainWindow.on("closed", () => {
    mainWindow = null
  })
}

// === APP READY ===
app.whenReady().then(() => {
  createWindow()

  // Verifica atualizações ao iniciar
  autoUpdater.checkForUpdatesAndNotify()
})

// === AUTO-UPDATER EVENTS ===
autoUpdater.on("checking-for-update", () => {
  console.log("Verificando atualizações...")
})

autoUpdater.on("update-available", (info) => {
  console.log("Atualização disponível:", info.version)
  mainWindow.webContents.send("updateAvailable", info.version)
})

autoUpdater.on("update-not-available", () => {
  console.log("Nenhuma atualização disponível.")
})

autoUpdater.on("error", (err) => {
  console.error("Erro ao atualizar:", err)
})

autoUpdater.on("download-progress", (progressObj) => {
  mainWindow.webContents.send("updateProgress", progressObj)
})

autoUpdater.on("update-downloaded", (info) => {
  console.log("Atualização baixada:", info.version)
  // Envia para o renderer para mostrar botão de reiniciar
  mainWindow.webContents.send("updateReady")
})

// === IPC EVENTS ===
ipcMain.on("minimize-window", () => {
  if (mainWindow) mainWindow.minimize()
})

ipcMain.on("close-window", () => {
  if (mainWindow) mainWindow.close()
})

ipcMain.on("restart-app", () => {
  autoUpdater.quitAndInstall()
})

// === MAC SPECIFIC ===
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
  if (mainWindow === null) createWindow()
})