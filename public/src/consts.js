const { app } = require('electron')

const root = app.getPath('desktop')
// ==============================================================
module.exports = {
  CONFIG: root + '/kubeconfig.yaml',

  DISABLED_NAMESPACES: 'kube-node-lease kube-public kube-system',

  DEFAULT_CONFIG: {
    apiVersion: 'v1',
    clusters: [],
    contexts: [],
    'current-context': '',
    kind: 'Config',
    preferences: {},
    users: []
  }
}
