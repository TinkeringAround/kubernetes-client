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
