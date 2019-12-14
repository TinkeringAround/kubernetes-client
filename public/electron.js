const { app } = require('electron')

// ==============================================================
require('./src/logger')
require('./src/k8s')
const { createWindow } = require('./window')

// ==============================================================
try {
  app.on('ready', createWindow)

  app.on('window-all-closed', () => app.quit())

  app.on('activate', () => {
    if (mainWindow === null) createWindow()
  })
} catch (error) {
  logError(error)
}
