import React, { FC, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Types
import { TContexts, TError, TNodes, TNamespaces, TServices, TService, TPods } from './types'

// Styles
import './styles/global.css'

// Context
import { AppContext, K8sContext } from './context'

// Components
import Layout from './components/layout'
import Nodes from './components/nodes'
import Services from './components/services'
import Pods from './components/pods'

// Driver
import { getContexts, getNodes, getNamespaces, getServices, getPods } from './driver/ipc'

// ==========================================================
const App: FC = () => {
  // App Context
  const [page, setPage] = useState<number>(0)
  const [error, setError] = useState<TError | null>(null)
  // K8s Context
  const [contexts, setContexts] = useState<TContexts | null>(null)
  const [nodes, setNodes] = useState<TNodes | null>(null)
  const [currentNamespace, setCurrentNamespace] = useState<string | null>('default')
  const [namespaces, setNamespaces] = useState<TNamespaces | null>(null)
  const [currentService, setCurrentService] = useState<TService | null>(null)
  const [services, setServices] = useState<TServices | null>(null)
  const [pods, setPods] = useState<TPods | null>(null)

  // ==========================================================
  const reloadContexts = useCallback(() => {
    const loadedContexts = getContexts()
    if ('activeContext' in loadedContexts) setContexts(loadedContexts)
    else setError(loadedContexts)

    return loadedContexts
  }, [])

  const reloadNodes = useCallback(() => {
    const loadedNodes = getNodes()
    if ('error' in loadedNodes) setError(loadedNodes)
    else setNodes(loadedNodes)

    return loadedNodes
  }, [])

  const setActiveNamespace = useCallback((newNamespace: string) => {
    setCurrentNamespace(newNamespace)
  }, [])

  const reloadNamespaces = useCallback(() => {
    const loadedNamespaces = getNamespaces()
    if ('error' in loadedNamespaces) setError(loadedNamespaces)
    else setNamespaces(loadedNamespaces)

    return loadedNamespaces
  }, [])

  const reloadServices = useCallback((namespace: string) => {
    const loadedServices = getServices(namespace)
    if ('error' in loadedServices) setError(loadedServices)
    else setServices(loadedServices)

    return loadedServices
  }, [])

  const setActiveService = useCallback(
    (service: TService | null) => {
      if (
        (service && !currentService) ||
        (!service && currentService) ||
        (service && currentService && service.name !== currentService.name)
      )
        setCurrentService(service)
    },
    [currentService]
  )

  const reloadPods = useCallback((namespace: string) => {
    const loadedPods = getPods(namespace)
    if ('error' in loadedPods) setError(loadedPods)
    else setPods(loadedPods)

    return loadedPods
  }, [])

  // ==========================================================
  return (
    <AppContext.Provider
      value={{
        // Page
        page: page,
        setPage: setPage,

        // Error
        error: error,
        setError: (error: TError) => setError(error)
      }}
    >
      <K8sContext.Provider
        value={{
          contexts: contexts,
          reloadContexts: reloadContexts,

          nodes: nodes,
          reloadNodes: reloadNodes,

          currentNamespace: currentNamespace,
          setNamespace: setActiveNamespace,
          namespaces: namespaces,
          reloadNamespaces: reloadNamespaces,

          currentService: currentService,
          setService: setActiveService,
          services: services,
          reloadServices: reloadServices,

          pods: pods,
          reloadPods: reloadPods
        }}
      >
        <Layout>
          {page === 0 && <Nodes />}
          {page === 1 && <Services />}
          {page === 2 && <Pods />}
        </Layout>
      </K8sContext.Provider>
    </AppContext.Provider>
  )
}

// ==========================================================
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
