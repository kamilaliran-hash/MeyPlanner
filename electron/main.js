// MeyPlanner – Windows desktop shell (Electron)
const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 380,
    minHeight: 600,
    title: 'MeyPlanner',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    backgroundColor: '#F5F7FA',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, spellcheck: true },
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));

  // Open external links (directions, attributions) in the default browser.
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); shell.openExternal(url); } });
  // Ctrl+Shift+I opens dev tools for troubleshooting.
  win.webContents.on('before-input-event', (e, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') win.webContents.toggleDevTools();
  });
}

if (!app.requestSingleInstanceLock()) app.quit();
app.setAppUserModelId('com.meyplanner.app');
app.whenReady().then(createWindow);
app.on('second-instance', () => { const w = BrowserWindow.getAllWindows()[0]; if (w) { if (w.isMinimized()) w.restore(); w.focus(); } });
app.on('window-all-closed', () => app.quit());
