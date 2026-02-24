const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        minWidth: 900,
        minHeight: 600,
        frame: false,               // sem borda nativa
        transparent: true,          // necessário para cantos arredondados
        roundedCorners: true,       // funciona no Windows 11
        vibrancy: "under-window",   // efeito glass no Mac
        backgroundColor: "#00000000", // transparente
        titleBarStyle: "hidden",    // esconde barra de título
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile("login.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

// === APP READY ===
app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});

// === AUTO-UPDATER EVENTS ===
autoUpdater.on("checking-for-update", () => console.log("Verificando atualizações..."));
autoUpdater.on("update-available", (info) => {
    console.log("Atualização disponível:", info.version);
    if (mainWindow) mainWindow.webContents.send("updateAvailable", info.version);
});
autoUpdater.on("update-not-available", () => console.log("Nenhuma atualização disponível."));
autoUpdater.on("error", (err) => console.error("Erro ao atualizar:", err));
autoUpdater.on("download-progress", (progressObj) => {
    if (mainWindow) mainWindow.webContents.send("updateProgress", progressObj);
});
autoUpdater.on("update-downloaded", () => {
    if (mainWindow) mainWindow.webContents.send("updateReady");
});

// === IPC EVENTS - BOTÕES DE JANELA ===
ipcMain.on("minimize-window", () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on("maximize-window", () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) mainWindow.unmaximize();
        else mainWindow.maximize();
    }
});

ipcMain.on("close-window", () => {
    if (mainWindow) mainWindow.close();
});

ipcMain.on("restart-app", () => autoUpdater.quitAndInstall());

// === IPC EVENTS - ABRIR TELAS ===
ipcMain.on("open-overview", (event, username) => {
    const overviewWindow = new BrowserWindow({
        width: 1200,
        height: 750,
        minWidth: 900,
        minHeight: 600,
        frame: false,
        transparent: true,
        roundedCorners: true,
        vibrancy: "under-window",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    overviewWindow.loadFile("overview.html");

    overviewWindow.webContents.on("did-finish-load", () => {
        overviewWindow.webContents.send("userName", username);
    });
});

ipcMain.on("open-user-registration", () => {
    const userRegWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 700,
        minHeight: 500,
        frame: false,
        transparent: true,
        roundedCorners: true,
        vibrancy: "under-window",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    userRegWindow.loadFile("user-registration.html");
});

// === IPC EVENT - ABRIR LINK DE ATUALIZAÇÃO ===
ipcMain.on("open-update-link", () => {
    shell.openExternal("https://github.com/Matheusbriporto/portopay/releases");
});

// === MAC SPECIFIC ===
app.on("window-all-closed", () => { 
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => { 
    if (mainWindow === null) createWindow();
});