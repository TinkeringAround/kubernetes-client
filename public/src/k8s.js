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
        let errors = []

        node.status.conditions.forEach(condition => {
          try {
            if (condition.type != 'Ready' && !condition.status) errors.push(condition.message)
          } catch (error) {
            logError(error)
          }
        })

        let aCPU = parseInt(node.status.allocatable.cpu.match(/\d/g).join(''), 10).toFixed()
        let cCPU = parseInt(node.status.capacity.cpu.match(/\d/g).join(''), 10).toFixed()

        return {
          name: node.metadata.name,
          allocatable: {
            cpu: aCPU < 10 ? aCPU * 1000 : aCPU,
            memory: (
              parseInt(node.status.allocatable.memory.match(/\d/g).join(''), 10) / 1000
            ).toFixed()
          },
          capacity: {
            cpu: cCPU < 10 ? cCPU * 1000 : cCPU,
            memory: (
              parseInt(node.status.capacity.memory.match(/\d/g).join(''), 10) / 1000
            ).toFixed()
          },
          conditions: {
            status: errors.length === 0,
            errors: errors
          },
          nodeInfo: {
            architecture: node.status.nodeInfo.architecture,
            containerRuntimeVersion: node.status.nodeInfo.containerRuntimeVersion,
            osImage: node.status.nodeInfo.osImage,
            kubeletVersion: node.status.nodeInfo.kubeletVersion,
            kernelVersion: node.status.nodeInfo.kernelVersion
          }
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
