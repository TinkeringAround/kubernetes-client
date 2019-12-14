const { app, ipcMain } = require('electron')
const { KubeConfig, Client } = require('kubernetes-client')
const Request = require('kubernetes-client/backends/request')

// Packages
const { logError } = require('./logger')

// ==============================================================
let client, kubeconfig

// ==============================================================
function getContexts(event) {
  try {
    event.returnValue = {
      data: {
        activeContext: kubeconfig.currentContext,
        contexts: kubeconfig.contexts.map(context => context.name)
      },
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: error
    }
  }
}

async function getNodes(event) {
  try {
    const nodes = await client.api.v1.nodes.get()
    event.returnValue = {
      data: nodes.body.items.map(node => {
        return {
          name: node.metadata.name,
          addresses: node.status.addresses,
          allocatable: node.status.allocatable,
          capacity: node.status.capacity,
          conditions: node.status.conditions, // TODO: Auswerten und true oder false zurückgeben
          nodeInfo: node.status.nodeInfo
        }
      }),
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: error
    }
  }
}

async function getNamespaces(event) {
  try {
    const namespaces = await client.api.v1.namespaces.get()
    event.returnValue = {
      data: namespaces.body.items,
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: error
    }
  }
}

async function getDeploymentsInNamespace(event, namespace) {
  try {
    const deployments = await client.apis.apps.v1.namespaces(namespace).deployments.get()
    event.returnValue = {
      data: deployments.body.items,
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: error
    }
  }
}

async function getServicesInNamespace(event, namespace) {
  try {
    let services = await client.api.v1.namespaces(namespace).services.get()
    event.returnValue = {
      data: services.body.items,
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: error
    }
  }
}

function portForwardToService(event, service, servicePort, targetPort) {
  try {
    var cmd = require('node-cmd')
    const command = `kubectl port-forward svc/${service} ${targetPort}:${servicePort}`
    cmd.run(command)
    event.returnValue = {
      data: {},
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: error
    }
  }
}

// ==============================================================
;(async () => {
  try {
    kubeconfig = new KubeConfig()
    kubeconfig.loadFromFile(app.getPath('home') + '/.kube/config')

    const backend = new Request({ kubeconfig })
    client = new Client({ backend, version: '1.13' })

    console.debug('Client initialized.')
  } catch (error) {
    logError(error)
  }
})()

// ==============================================================
ipcMain.on('clusters', getContexts)
ipcMain.on('nodes', getNodes)
ipcMain.on('namespaces', getNamespaces)
ipcMain.on('deployments', getDeploymentsInNamespace)
ipcMain.on('services', getServicesInNamespace)
ipcMain.on('portForwardToService', portForwardToService)
