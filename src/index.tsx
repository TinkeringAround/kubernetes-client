import React, { FC, useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { PoseGroup } from 'react-pose'

// Types
import { TContexts, TError, TNodes, TNamespaces, TServices, TService, TPods } from './types'

// Styles
import './styles/global.css'

// Context
import { AppContext, K8sContext, SettingsContext } from './context'

// Atoms
import { APage } from './atoms/animations'

// Components
import Layout from './components/layout'
import Nodes from './components/nodes'
import Services from './components/services'
import Pods from './components/pods'
import Settings from './components/settings'
import Setup from './components/setup'
import ErrorDialog from './components/dialogs/error'

// Driver
import {
  mergeKubeconfig,
  getContexts,
  setActiveContext,
  deleteContext,
  getNodes,
  getNamespaces,
  getServices,
  getPods,
  stopPortForward
} from './driver/ipc'

// ==========================================================
const App: FC = () => {
  // App Context
  const [page, setPage] = useState<number>(-2)
  const [error, setError] = useState<TError | null>(null)
  // K8s Context
  const [contexts, setContexts] = useState<TContexts | null>(null)
  const [nodes, setNodes] = useState<TNodes | null>(null)
  const [currentNamespace, setCurrentNamespace] = useState<string | null>('default')
  const [namespaces, setNamespaces] = useState<TNamespaces | null>(null)
  const [currentService, setCurrentService] = useState<TService | null>(null)
  const [services, setServices] = useState<TServices | null>(null)
  const [pods, setPods] = useState<TPods | null>(null)
  // Settings Context
  const [port, setPort] = useState<number>(35000)

  // ==========================================================
  const setKubeconfig = useCallback((files: Array<string>) => {
    const loadedContexts = mergeKubeconfig(files)
    if ('activeContext' in loadedContexts) {
      setContexts(loadedContexts)
      setPage(0)
    } else setError(loadedContexts)

    return loadedContexts
  }, [])

  const reloadContexts = useCallback(() => {
    const loadedContexts = getContexts()
    if ('activeContext' in loadedContexts) {
      setContexts(loadedContexts)
      setPage(0)
    } else setPage(-1)

    return loadedContexts
  }, [])

  const setContext = useCallback((context: string) => {
    const loadedContexts = setActiveContext(context)
    if ('activeContext' in loadedContexts) {
      setContexts(loadedContexts)
      setCurrentNamespace('default')
      setPage(0)
    } else setError(loadedContexts)

    return loadedContexts
  }, [])

  const deleteCluster = useCallback(
    (context: string) => {
      const deletedContext = deleteContext(context)
      if (typeof deletedContext === 'boolean') {
        reloadContexts()
        setCurrentNamespace('default')
      } else setError(deletedContext)

      return deletedContext
    },
    [reloadContexts]
  )

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
  useEffect(() => {
    if (!contexts) reloadContexts()
  }, [contexts, reloadContexts])

  useEffect(() => {
    if (currentService) {
      setCurrentService(null)
      stopPortForward()
    }
  }, [port])

  const noValidConfig =
    page === -1 || !contexts || (contexts != null && contexts.contexts.length === 0)

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
          setKubeconfig: setKubeconfig,

          contexts: contexts,
          setContext: setContext,
          deleteContext: deleteCluster,
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
        <SettingsContext.Provider
          value={{
            port: port,
            setPort: setPort
          }}
        >
          <Layout>
            {/* Content */}
            <PoseGroup flipMove={false}>
              {noValidConfig && (
                <APage key="Setup">
                  <Setup />
                </APage>
              )}

              {page === 0 && (
                <APage key="Nodes">
                  <Nodes />
                </APage>
              )}
              {page === 1 && (
                <APage key="Services">
                  <Services />
                </APage>
              )}
              {page === 2 && (
                <APage key="Pods">
                  <Pods />
                </APage>
              )}
              {page === 3 && (
                <APage key="Settings">
                  <Settings />
                </APage>
              )}
            </PoseGroup>

            {/* Dialogs */}
            <ErrorDialog error={error} close={() => setError(null)} />
          </Layout>
        </SettingsContext.Provider>
      </K8sContext.Provider>
    </AppContext.Provider>
  )
}

// ==========================================================
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
