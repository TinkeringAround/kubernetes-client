import { Remote, IpcRenderer } from 'electron'

// ==========================================================
export type TElectron = {
  remote: Remote
  ipcRenderer: IpcRenderer
}

declare global {
  interface Window {
    electron: TElectron
  }
}

// ==========================================================
export type TResponse = {
  data: TContexts | TNodes | TNamespaces | TServices | null
  error: string | null
}

export type TError = {
  message: string
  error: string
}

// ==========================================================
export type TContexts = {
  activeContext: string
  contexts: Array<string>
}

// ==========================================================
export type TNodes = Array<TNode>

export type TNode = {
  name: string
  allocatable: TSpec
  capacity: TSpec
  conditions: TCondition
  nodeInfo: TNodeInfo
}

export type TSpec = {
  cpu: number
  memory: number
}

export type TSpecTypes = 'cpu' | 'memory'

export type TCondition = {
  errors: Array<string>
  status: boolean
}

export type TNodeInfo = {
  architecture: string
  containerRuntimeVersion: string
  kernelVersion: string
  kubeletVersion: string
  osImage: string
}

// ==========================================================
export type TNamespaces = Array<TNamespace>

export type TNamespace = {
  name: string
  status: boolean
}

// ==========================================================
export type TServices = Array<TService>

export type TService = {
  name: string
  type: TServiceType
  ports: Array<TServicePort>
}

export type TServiceType = 'ClusterIP' | 'LoadBalancer' | 'NodePort'

export type TServicePort = {
  name: string
  port: number
  protocol: string
}
