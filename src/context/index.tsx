import React from 'react'

// Types
import { TError, TContexts, TNodes } from '../types'

// ==========================================================
type AppContextProps = {
  page: number
  setPage: (newPage: number) => void

  error: TError | null
  setError: (error: TError) => void
}

export const AppContext = React.createContext<AppContextProps>({
  page: 0,
  setPage: (newPage: number) => {},

  error: null,
  setError: (error: TError) => {}
})

// ==========================================================
type K8sContextProps = {
  contexts: TContexts | null
  reloadContexts: () => TContexts | TError

  nodes: TNodes | null
  reloadNodes: () => TNodes | TError
}

export const K8sContext = React.createContext<K8sContextProps>({
  // Context
  contexts: null,
  reloadContexts: () => {
    return {
      message: '',
      error: ''
    }
  },

  // Nodes
  nodes: null,
  reloadNodes: () => {
    return {
      message: '',
      error: ''
    }
  }
})
