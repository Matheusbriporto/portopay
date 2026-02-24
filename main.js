const { autoUpdater } = require("electron-updater")
const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

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
      nodeIntegration: false
    }
  })

  mainWindow.loadFile("login.html")
}

app.whenReady().then(createWindow)

app.whenReady().then(() => {

  createWindow()

  autoUpdater.checkForUpdatesAndNotify()

})

autoUpdater.on("update-available", () => {
  console.log("Atualização disponível.")
})

autoUpdater.on("update-downloaded", () => {
  console.log("Atualização baixada. Instalando...")
  autoUpdater.quitAndInstall()
})

ipcMain.on("minimize-window", () => {
  mainWindow.minimize()
})

ipcMain.on("close-window", () => {
  mainWindow.close()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})