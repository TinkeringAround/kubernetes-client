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
  data: TContexts | null
  error: string | null
}

export type TContexts = {
  activeContext: string
  contexts: Array<string>
}
