import React from 'react'

// Types
import { TError, TContexts, TNodes, TNamespaces, TServices, TService, TPods } from '../types'

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
  setKubeconfig: (files: Array<string>) => TContexts | TError

  contexts: TContexts | null
  setContext: (context: string) => TContexts | TError
  reloadContexts: () => TContexts | TError

  nodes: TNodes | null
  reloadNodes: () => TNodes | TError

  currentNamespace: string | null
  setNamespace: (namespace: string) => void
  namespaces: TNamespaces | null
  reloadNamespaces: () => TNamespaces | TError

  currentService: TService | null
  setService: (service: TService | null) => void
  services: TServices | null
  reloadServices: (namespace: string) => TServices | TError

  pods: TPods | null
  reloadPods: (namespace: string) => TPods | TError
}

export const K8sContext = React.createContext<K8sContextProps>({
  // Kubeconfig
  setKubeconfig: (files: Array<string>) => {
    return {
      message: '',
      error: ''
    }
  },

  // Context
  contexts: null,
  setContext: (context: string) => {
    return {
      message: '',
      error: ''
    }
  },
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
  },

  // Namespaces
  currentNamespace: null,
  setNamespace: (namespace: string) => {},
  namespaces: null,
  reloadNamespaces: () => {
    return {
      message: '',
      error: ''
    }
  },

  // Services
  currentService: null,
  setService: (service: TService | null) => {},
  services: null,
  reloadServices: (namespace: string) => {
    return {
      message: '',
      error: ''
    }
  },

  // Pods
  pods: null,
  reloadPods: (namespace: string) => {
    return {
      message: '',
      error: ''
    }
  }
})
