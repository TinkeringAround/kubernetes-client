const { app, ipcMain } = require('electron')

// ==============================================================
function logError(error) {
  const message = getTimestamp() + '   ERROR    ' + error
  console.error(message)
}

function logInfo(info) {
  const message = getTimestamp() + '   INFO     ' + info

  console.info(message)
}

// ==============================================================
function getTimestamp() {
  var a = new Date(Date.now())
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate()

  var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours()
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds()

  var time = hour + ':' + min + ':' + sec + ', ' + date + '. ' + month + ' ' + year
  return time
}
// ==============================================================
try {
  console.info(`===> Running K8s-Client Version ${app.getVersion()}`)
  ipcMain.on('version', event => {
    event.returnValue = {
      data: app.getVersion(),
      error: null
    }
  })
} catch (error) {
  logError(error)
}

// ==============================================================
module.exports = {
  logError,
  logInfo
}
