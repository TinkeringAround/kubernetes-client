// Types
import { TResponse, TContexts, TError, TNodes, TNamespaces } from '../types'

// Consts
const { ipcRenderer } = window.electron

// ==========================================================
export const getContexts: () => TContexts | TError = () => {
  const response: TResponse = ipcRenderer.sendSync('clusters')
  console.info('Contexts: ', response.data)

  if (response.data) return response.data as TContexts
  else {
    console.error(response.error)
    return {
      message: 'An unexpected error occured.',
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
      message: 'An unexpected error occured.',
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
      message: 'An unexpected error occured.',
      error: response.error ? response.error : 'Unkown Error.'
    }
  }
}
