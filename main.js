const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    icon: path.join(__dirname, "assets/icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadFile("login.html")
}

app.whenReady().then(createWindow)

ipcMain.on("minimize", () => mainWindow.minimize())
ipcMain.on("maximize", () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})
ipcMain.on("close", () => mainWindow.close())

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})