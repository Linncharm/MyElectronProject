import { app, BrowserWindow, globalShortcut } from 'electron'
import path from 'node:path'
//import { VUEJS3_DEVTOOLS } from 'electron-devtools-installer/src'
//import install from 'electron-devtools-installer/src'
import { session } from 'electron'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // }
    })

    win.loadFile('index.html')
}

const vueDevToolsPath = 'C:/Users/linnc/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/7.6.3_1'

// Register a global shortcut to open dev tools
function registryShortcut() {
    globalShortcut.register('shift+CommandOrControl+m+k', () => {
        BrowserWindow.getFocusedWindow()?.webContents?.openDevTools();
    });
}

app.whenReady().then(async () => {
    /*try {
        const name = await install(VUEJS3_DEVTOOLS, true)
        console.log(`Added Extension: ${name}`)
    } catch (err) {
        console.error('Failed to install extension:', err)
    }*/
    await session.defaultSession.loadExtension(vueDevToolsPath)
        .then(() => {
            console.log('Vue DevTools loaded')
        })
    createWindow();
    registryShortcut();
})