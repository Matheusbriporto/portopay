const { app, BrowserWindow, ipcMain } = require("electron")
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
    roundedCorners: true,      
    vibrancy: "under-window",  
    backgroundColor: "#00000000",
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
  autoUpdater.checkForUpdatesAndNotify()
})

// === AUTO-UPDATER EVENTS ===
autoUpdater.on("checking-for-update", () => console.log("Verificando atualizações..."))
autoUpdater.on("update-available", (info) => {
  console.log("Atualização disponível:", info.version)
  mainWindow.webContents.send("updateAvailable", info.version)
})
autoUpdater.on("update-not-available", () => console.log("Nenhuma atualização disponível."))
autoUpdater.on("error", (err) => console.error("Erro ao atualizar:", err))
autoUpdater.on("download-progress", (progressObj) => mainWindow.webContents.send("updateProgress", progressObj))
autoUpdater.on("update-downloaded", () => mainWindow.webContents.send("updateReady"))

// === IPC EVENTS ===
ipcMain.on("minimize", () => mainWindow.minimize())
ipcMain.on("close", () => mainWindow.close())
ipcMain.on("maximize", () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize()
  else mainWindow.maximize()
})
ipcMain.on("restart-app", () => autoUpdater.quitAndInstall())

// === NOVO: abrir overview ===
ipcMain.on("open-overview", () => {
  if (mainWindow) {
    mainWindow.loadFile("overview.html")
  }
})

// === MAC SPECIFIC ===
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit() })
app.on("activate", () => { if (mainWindow === null) createWindow() })