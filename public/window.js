const { BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// Packages
const { logError, logInfo } = require('./src/logger')

// ==============================================================
let mainWindow

// ==============================================================
function createWindow() {
  try {
    if (mainWindow == null) {
      mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        minHeight: 600,
        minWidth: 1000,
        webPreferences: {
          nodeIntegration: false,
          preload: __dirname + '/src/preload.js'
        }
      })

      mainWindow.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
      )

      mainWindow.on('closed', () => (mainWindow = null))
      logInfo('Main Window Creation was successful.')
    }
  } catch (error) {
    logError(error)
  }
}

// ==============================================================
module.exports = {
  createWindow
}
