/* Class 10 Learning Hub — Windows desktop shell (Electron).
   Loads the live site in a clean app window; external links open in the
   default browser. */
const { app, BrowserWindow, shell } = require("electron");
const path = require("path");

const HOME = "https://class10-learning-hub.onrender.com/";

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    title: "Class 10 Learning Hub",
    icon: path.join(__dirname, "icon.png"),
    backgroundColor: "#ffffff",
    webPreferences: { contextIsolation: true },
  });
  win.loadURL(HOME);
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(HOME)) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
