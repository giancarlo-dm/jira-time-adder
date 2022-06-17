const path = require("path");

const {app, BrowserWindow, ipcMain, dialog} = require("electron");
const isDev = require("electron-is-dev");

/**
 * @type {BrowserWindow|null}
 */
let mainWindow = null;

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension;
let REACT_DEVELOPER_TOOLS;

if (isDev) {
    const devTools = require("electron-devtools-installer");
    installExtension = devTools.default;
    REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
    app.quit();
}

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

/**
 * Shows a modal dialog for the main window. Use this instead of window.confirm due to bugs on windows
 * and also it is more customizable.
 */
ipcMain.handle(
    "show-modal",
    /**
     * @param event {IpcMainInvokeEvent}
     * @param args {MessageBoxOptions}
     */
    async (event, args) => {
        return await dialog.showMessageBox(mainWindow, args);
    }
);

/**
 * Creates the main window when the Electron App is ready
 */
app.whenReady()
    .then(() => {
        mainWindow = createWindow();
    });

/**
 *
 * @return {BrowserWindow}
 */
function createWindow() {

    // Create the browser window.
    const win = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (isDev) {
        win.maximize();
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
        installExtension(REACT_DEVELOPER_TOOLS, {allowFileAccess: true})
            .then(name => console.log(`Added Extension:  ${name}`))
            .catch(error => console.log(`An error occurred: , ${error}`));
    }
    else {
        win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
    }

    return win;
}
