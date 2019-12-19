const { app, ipcMain } = require('electron')
const { KubeConfig, Client } = require('kubernetes-client')
const Request = require('kubernetes-client/backends/request')

// Packages
const { logError } = require('./logger')

// ==============================================================
let client, kubeconfig, childProcess
const disabledNamespaces = 'kube-node-lease kube-public kube-system'

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

        let aCPU = parseInt(
          parseInt(node.status.allocatable.cpu.match(/\d/g).join(''), 10).toFixed()
        )
        let aMemory = parseInt(
          (parseInt(node.status.allocatable.memory.match(/\d/g).join(''), 10) / 1000).toFixed()
        )
        let cCPU = parseInt(parseInt(node.status.capacity.cpu.match(/\d/g).join(''), 10).toFixed())
        let cMemory = parseInt(
          (parseInt(node.status.capacity.memory.match(/\d/g).join(''), 10) / 1000).toFixed()
        )

        return {
          name: node.metadata.name,
          allocatable: {
            cpu: aCPU < 10 ? aCPU * 1000 : aCPU,
            memory: aMemory
          },
          capacity: {
            cpu: cCPU < 10 ? cCPU * 1000 : cCPU,
            memory: cMemory
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
    const filteredNamespaces = namespaces.body.items.reduce((result, namespace) => {
      if (!disabledNamespaces.includes(namespace.metadata.name)) result.push(namespace)
      return result
    }, [])

    event.returnValue = {
      data: filteredNamespaces.map(namespace => {
        return {
          name: namespace.metadata.name,
          status: namespace.status.phase.includes('ctive')
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
      data: services.body.items.map(service => {
        return {
          name: service.metadata.name,
          type: service.spec.type,
          ports: service.spec.ports.map(port => {
            return {
              name: port.name,
              port: port.port,
              protocol: port.protocol
            }
          })
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

function portForwardToService(event, service, servicePort, targetPort) {
  try {
    var cmd = require('node-cmd')
    const command = `kubectl port-forward svc/${service} ${targetPort}:${servicePort}`
    childProcess = cmd.run(command)
    console.debug('Started a new Child Process: ', childProcess)
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

function stopPortForward(event) {
  try {
    if (childProcess) {
      childProcess.kill(1)
      childProcess = null
    }

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
ipcMain.on('startPortForwardToService', portForwardToService)
ipcMain.on('stopPortForward', stopPortForward)
