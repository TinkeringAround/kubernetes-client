import { Remote, IpcRenderer } from 'electron'

// ==========================================================
export type TError = {
  message: string
  error: string
}

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
  data: TContexts | TNodes | null
  error: string | null
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
