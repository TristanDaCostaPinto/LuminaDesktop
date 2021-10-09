const { app, BrowserWindow, Menu, screen } = require('electron')
const isDev = require('electron-is-dev');

let mainWindow;

// function createMenu() {
//     const template = [
//         {
//             label: 'Gestion',
//             submenu: [
//                 {
//                     label: 'Nouveau Membre',
//                     click: function () {
//                         const { width, height } = screen.getPrimaryDisplay().workAreaSize
//                         let win = new BrowserWindow({
//                             width,
//                             height,
//                             webPreferences: {
//                                 nativeWindowOpen: true,
//                             }
//                         })
//                         win.setMenu(null);
//                         win.loadURL('http://localhost:3000/register')
//                     }
//                 },
//                 { type: 'separator' },
//                 {
//                     label: 'Nouveau Rendez-Vous',
//                     click: function () {
//                         const { width, height } = screen.getPrimaryDisplay().workAreaSize
//                         let win = new BrowserWindow({
//                             width,
//                             height,
//                             webPreferences: {
//                                 nativeWindowOpen: true,
//                             }
//                         })
//                         win.setMenu(null);
//                         win.loadURL(isDev ? '/addAppointment' : `file://${__dirname}/../build/index.html#/addAppointment`)
//                     }
//                 },
//                 { type: 'separator' },
//                 {
//                     label: 'Nouvelle Propriété',
//                     click: function () {
//                         const { width, height } = screen.getPrimaryDisplay().workAreaSize
//                         let win = new BrowserWindow({
//                             width,
//                             height,
//                             webPreferences: {
//                                 nativeWindowOpen: true,
//                             }
//                         })
//                         win.setMenu(null);
//                         win.loadURL(isDev ? 'http://localhost:3000/addProperty' : `file://${__dirname}/../build/index.html#/addProperty`)
//                     }
//                 },
//                 { type: 'separator' },
//                 {
//                     label: 'Nouvelle Agence',
//                     click: function () {
//                         const { width, height } = screen.getPrimaryDisplay().workAreaSize
//                         let win = new BrowserWindow({
//                             width,
//                             height,
//                             webPreferences: {
//                                 nativeWindowOpen: true,
//                             }
//                         })
//                         win.setMenu(null);
//                         win.loadURL(isDev ? 'http://localhost:3000/addAgency' : `file://${__dirname}/../build/index.html#/addAgency`)
//                     }
//                 },
//             ]

//         },
//     ]
//     const menu = Menu.buildFromTemplate(template)
//     Menu.setApplicationMenu(menu)
// }


function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width,
        height,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nativeWindowOpen: true,
        }
    })
    Menu.setApplicationMenu(null);
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/../build/index.html`);

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}



app.whenReady().then(() => {
    createWindow();
    // createMenu();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})