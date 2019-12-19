const { app } = require('electron')

// ==============================================================
const { logError } = require('./src/logger')
const { stopPortForward } = require('./src/k8s')
const { createWindow } = require('./window')

// ==============================================================
process.on('uncaughtException', error => logError(`Main process: Uncaught Exception: ${error}`))

try {
  app.on('ready', createWindow)
  app.on('activate', createWindow)
  app.on('window-all-closed', () => {
    stopPortForward()
    app.quit()
  })
} catch (error) {
  logError(error)
}
