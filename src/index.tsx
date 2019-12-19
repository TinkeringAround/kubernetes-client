import React, { FC, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Types
import { TContexts, TError, TNodes, TNamespaces, TNamespace, TServices, TService } from './types'

// Styles
import './styles/global.css'

// Context
import { AppContext, K8sContext } from './context'

// Components
import Layout from './components/layout'
import Nodes from './components/nodes'
import Services from './components/services'

// Driver
import { getContexts, getNodes, getNamespaces, getServices } from './driver/ipc'

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

  const setActiveNamespace = useCallback(
    (newNamespace: string) => {
      if (namespaces && currentNamespace) {
        const ns: TNamespace | undefined = namespaces.find(n => n.name.includes(newNamespace))
        if (ns && !currentNamespace.includes(newNamespace)) setCurrentNamespace(newNamespace)
      }
    },
    [namespaces, currentNamespace, setCurrentNamespace]
  )

  const reloadNamespaces = useCallback(() => {
    const loadedNamespaces = getNamespaces()
    if ('error' in loadedNamespaces) setError(loadedNamespaces)
    else setNamespaces(loadedNamespaces)

    if (currentNamespace) setActiveNamespace(currentNamespace)

    return loadedNamespaces
  }, [currentNamespace, setActiveNamespace])

  const reloadServices = useCallback(() => {
    if (currentNamespace) {
      const loadedServices = getServices(currentNamespace)
      if ('error' in loadedServices) setError(loadedServices)
      else setServices(loadedServices)

      return loadedServices
    } else
      return {
        message: 'An error occured fetching Services.',
        error: 'No namespace provided.'
      }
  }, [currentNamespace])

  const setActiveService = useCallback((service: TService | null) => {
    // if (currentService) {
    //   // Stop other Port Forwarding First
    //   // Then start new one
    // }
    console.info('New selected Service: ', service ? service.name : 'Null')
    setCurrentService(service)
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
          reloadServices: reloadServices
        }}
      >
        <Layout>
          {page === 0 && <Nodes />}
          {page === 1 && <Services />}
        </Layout>
      </K8sContext.Provider>
    </AppContext.Provider>
  )
}

// ==========================================================
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
