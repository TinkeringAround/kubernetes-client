// Types
import { TResponse, TContexts } from '../types'

// Consts
const { ipcRenderer } = window.electron

// ==========================================================
export const getContexts: () => TContexts | null = () => {
  const response: TResponse = ipcRenderer.sendSync('clusters')

  if (response.error) console.error(response.error)
  else if (response.data) return response.data as TContexts

  return null
}

export const getNodes: () => object | null = () => {
  const response: TResponse = ipcRenderer.sendSync('nodes')
  console.log('Nodes: ', response.data)

  if (response.error) console.error(response.error)
  else if (response.data) return response.data

  return null
}
