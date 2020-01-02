const { ipcMain } = require('electron')
const { KubeConfig, Client } = require('kubernetes-client')
const Request = require('kubernetes-client/backends/request')
var cmd = require('node-cmd')

// Packages
const { logError, logInfo } = require('./logger')
const { CONFIG, DISABLED_NAMESPACES } = require('./consts')

// ==============================================================
let client, backend, kubeconfig
let childProcesses = []

// ==============================================================
function setupKubeconfig() {
  kubeconfig = new KubeConfig()
  kubeconfig.loadFromFile(CONFIG)

  backend = new Request({ kubeconfig })
  client = new Client({ backend, version: '1.13' })

  logInfo('Client setup was successful.')
}

// ==============================================================
function setKubeconfig(event, configFiles) {
  try {
    const fs = require('fs')
    const yaml = require('yaml')
    const path = require('path')

    // New Config
    var newConfig = {
      apiVersion: 'v1',
      clusters: [],
      contexts: [],
      'current-context': '',
      kind: 'Config',
      preferences: {},
      users: []
    }

    // Transfer old Values
    if (kubeconfig.hasOwnProperty('clusters')) {
      newConfig.clusters = kubeconfig.clusters
      newConfig.contexts = kubeconfig.contexts
      newConfig['current-context'] = kubeconfig.currentContext
      newConfig.users = kubeconfig.users
    }

    // Load Config
    configFiles.forEach(config => {
      try {
        const loadedConfig = yaml.parse(fs.readFileSync(path.resolve(config), 'utf-8'))
        if (loadedConfig) {
          newConfig.clusters = [
            ...newConfig.clusters.map(clstr => {
              return {
                name: clstr.name,
                cluster: {
                  'certificate-authority-data': clstr.caData,
                  server: clstr.server
                }
              }
            }),
            ...loadedConfig.clusters
          ]
          newConfig.contexts = [
            ...newConfig.contexts.map(ctx => {
              return {
                name: ctx.name,
                context: {
                  cluster: ctx.cluster,
                  namespace: ctx.namespace,
                  user: ctx.user
                }
              }
            }),
            ...loadedConfig.contexts
          ]
          newConfig.users = [
            ...newConfig.users.map(usr => {
              return {
                name: usr.name,
                user: {
                  'client-certificate-data': usr.certData,
                  'client-key-data': usr.keyData
                }
              }
            }),
            ...loadedConfig.users
          ]
        }
      } catch (e) {
        logError('Could not open File.')
      }
    })

    // Set Current Index when not set
    if (newConfig['current-context'] == '' && newConfig.contexts.length > 0)
      newConfig['current-context'] = newConfig.contexts[0].name

    // Save new Document
    if (fs.existsSync(CONFIG)) fs.unlinkSync(CONFIG)
    fs.appendFileSync(CONFIG, yaml.stringify(newConfig))

    // Reload Kubeconfig
    setupKubeconfig()
    logInfo('Kubeconfig Setup was successful.')
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
      error: 'Could not merge selected Kubeconfig files.'
    }
  }
}

function getContexts(event) {
  try {
    logInfo('Fetching Contexts from Kubeconfig.')
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
      error: 'Could not fetch Cluster Information from Kubeconfig.'
    }
  }
}

async function getNodes(event) {
  try {
    logInfo('Fetching Nodes via Client.')
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
      error: 'Could not get Nodes Information of current Cluster.'
    }
  }
}

async function getNamespaces(event) {
  try {
    logInfo('Fetching Namespaces via Client.')
    const namespaces = await client.api.v1.namespaces.get()
    const filteredNamespaces = namespaces.body.items.reduce((result, namespace) => {
      if (!DISABLED_NAMESPACES.includes(namespace.metadata.name)) result.push(namespace)
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
      error: 'Could not fetch Namespaces for current Cluster.'
    }
  }
}

async function getDeploymentsInNamespace(event, namespace) {
  try {
    logInfo('Fetching Deployments via Client.')
    const deployments = await client.apis.apps.v1.namespaces(namespace).deployments.get()
    event.returnValue = {
      data: deployments.body.items,
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: 'Could not get Deployments for current Namespace ' + namespace + '.'
    }
  }
}

async function getServicesInNamespace(event, namespace) {
  try {
    if (!namespace) throw new Error('No Namespace provided.')

    logInfo(`Fetching Services in Namespace "${namespace}" via Client.`)
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
      error: 'Could not fetch Services for current Namespace ' + namespace + '.'
    }
  }
}

async function getPodsInNamespace(event, namespace) {
  try {
    if (!namespace) throw new Error('No Namespace provided.')
    logInfo(`Fetching Pods in Namespace "${namespace}" via Client.`)
    let pods = await client.api.v1.namespaces(namespace).pods.get()
    event.returnValue = {
      data: pods.body.items.map(pod => {
        return {
          name: pod.metadata.name,
          creation: pod.metadata.creationTimestamp,
          containers: pod.status.containerStatuses.map(container => {
            return {
              name: container.name,
              image: container.image,
              running: container.ready,
              restartCount: container.restartCount
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
      error: 'Could not get Pods for current Namespace ' + namespace + '.'
    }
  }
}

async function getLogsForPodInNamespace(event, namespace, pod, limit = '10') {
  try {
    if (!namespace) throw new Error('No valid Namespace provided.')
    if (!pod) throw new Error('No valid Pod provided.')

    logInfo(`Fetching Logs for ${pod.name} in Namespace "${namespace}" via Client.`)
    let logs = await client.api.v1
      .namespaces(namespace)
      .pods(pod.name)
      .log.get({
        qs: {
          pretty: true,
          tailLines: parseInt(limit)
        }
      })

    event.returnValue = {
      data: logs.body.split('\n'),
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: 'Could not get Logs for Pod ' + pod.name + ' in current Namespace ' + namespace + '.'
    }
  }
}

function portForwardToService(event, service, targetPort) {
  try {
    stopPortForward()

    service.ports.forEach((port, index) => {
      const command = `kubectl port-forward svc/${service.name} ${targetPort + index}:${port.port}`
      const child = cmd.run(command)
      childProcesses.push(child)

      logInfo(
        `Started PF for Service "${service.name}" => ${port.port}:${targetPort + index}, PID: ${
          child.pid
        }`
      )
    })

    event.returnValue = {
      data: {
        success: true
      },
      error: null
    }
  } catch (error) {
    logError(error)
    event.returnValue = {
      data: null,
      error: 'Could not start Port Forwarding to Port ' + (port + index) + '.'
    }
  }
}

function stopPortForward(event) {
  try {
    childProcesses.forEach(child => {
      child.kill(1)
      logInfo('Stopped running Child Process with PID ' + child.pid)
    })
    childProcesses = []

    if (event)
      event.returnValue = {
        data: {
          success: true
        },
        error: null
      }
  } catch (error) {
    logError(error)
    if (event)
      event.returnValue = {
        data: null,
        error: 'Port Forwarding could not be stopped successfully.'
      }
  }
}

// ==============================================================
try {
  setupKubeconfig()
} catch (error) {
  logError(error)
}

// ==============================================================
ipcMain.on('kubeconfig', setKubeconfig)
ipcMain.on('clusters', getContexts)
ipcMain.on('nodes', getNodes)
ipcMain.on('namespaces', getNamespaces)
ipcMain.on('deployments', getDeploymentsInNamespace)
ipcMain.on('services', getServicesInNamespace)
ipcMain.on('pods', getPodsInNamespace)
ipcMain.on('logs', getLogsForPodInNamespace)
ipcMain.on('startPortForwardToService', portForwardToService)
ipcMain.on('stopPortForward', stopPortForward)

// ==============================================================
module.exports = {
  stopPortForward
}
