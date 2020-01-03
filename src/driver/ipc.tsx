// Types
import {
  TResponse,
  TContexts,
  TError,
  TNodes,
  TNamespaces,
  TServices,
  TService,
  TPods,
  TLog,
  TPod,
  TLogLimit
} from '../types'

// Consts
const { ipcRenderer } = window.electron

// ==========================================================
export const getAppVersion: () => string | TError = () => {
  const response: TResponse = ipcRenderer.sendSync('version')
  console.info('Contexts: ', response.data)

  if (response.data) return response.data as string
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

// ==========================================================
export const mergeKubeconfig: (configFiles: Array<string>) => TContexts | TError = (
  configFiles: Array<string>
) => {
  const response: TResponse = ipcRenderer.sendSync('kubeconfig', configFiles)
  console.info('Contexts: ', response.data)

  if (response.data) return response.data as TContexts
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

// ==========================================================
export const getContexts: () => TContexts | TError = () => {
  const response: TResponse = ipcRenderer.sendSync('clusters')
  console.info('Contexts: ', response.data)

  if (response.data) return response.data as TContexts
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

export const setActiveContext: (context: string) => TContexts | TError = (context: string) => {
  const response: TResponse = ipcRenderer.sendSync('activeCluster', context)
  console.info('Contexts: ', response.data)

  if (response.data) return response.data as TContexts
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

// ==========================================================
export const getNodes: () => TNodes | TError = () => {
  const response: TResponse = ipcRenderer.sendSync('nodes')
  console.info('Nodes: ', response.data)

  if (response.data) return response.data as TNodes
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

// ==========================================================
export const getNamespaces: () => TNamespaces | TError = () => {
  const response: TResponse = ipcRenderer.sendSync('namespaces')
  console.info('Namespaces: ', response.data)

  if (response.data) return response.data as TNamespaces
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

// ==========================================================
export const getServices: (namespace: string | null) => TServices | TError = (
  namespace: string | null
) => {
  const response: TResponse = ipcRenderer.sendSync('services', namespace)
  console.info('Services: ', response.data)

  if (response.data) return response.data as TServices
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

// ==========================================================
export const getPods: (namespace: string | null) => TPods | TError = (namespace: string | null) => {
  const response: TResponse = ipcRenderer.sendSync('pods', namespace)
  console.info('Pods: ', response.data)

  if (response.data) return response.data as TPods
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

// ==========================================================
export const getLogsForPod: (
  namespace: string | null,
  pod: TPod | null,
  limit: TLogLimit
) => TLog | TError = (namespace: string | null, pod: TPod | null, limit: TLogLimit) => {
  const response: TResponse = ipcRenderer.sendSync('logs', namespace, pod, limit)
  console.info('Logs: ', response.data)

  if (response.data) return response.data as TLog
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

// ==========================================================
export const startPortForwardToService: (service: TService, targetPort: number) => true | TError = (
  service: TService,
  targetPort: number
) => {
  const response: TResponse = ipcRenderer.sendSync('startPortForwardToService', service, targetPort)
  console.info('Start Port Forwarding: ', response.data)

  if (response.data) return true
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}

export const stopPortForward: () => true | TError = () => {
  const response: TResponse = ipcRenderer.sendSync('stopPortForward')
  console.info('Stop Port Forwarding: ', response.data)

  if (response.data) return true
  else {
    console.error(response.error)
    return {
      message: 'Unexpected Error',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}
