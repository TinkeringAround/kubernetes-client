import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Types
import { TContexts, TError, TNodes, TNamespaces } from './types'

// Styles
import './styles/global.css'

// Context
import { AppContext, K8sContext } from './context'

// Components
import Layout from './components/layout'
import Nodes from './components/nodes'

// Driver
import { getContexts, getNodes, getNamespaces } from './driver/ipc'

// ==========================================================
const App: FC = () => {
  // App Context
  const [page, setPage] = useState<number>(0)
  const [error, setError] = useState<TError | null>(null)
  // K8s Context
  const [contexts, setContexts] = useState<TContexts | null>(null)
  const [nodes, setNodes] = useState<TNodes | null>(null)
  const [namespaces, setNamespaces] = useState<TNamespaces | null>(null)

  // ==========================================================
  const reloadContexts = () => {
    const loadedContexts = getContexts()
    if ('activeContext' in loadedContexts) setContexts(loadedContexts)
    else setError(loadedContexts)

    return loadedContexts
  }

  const reloadNodes = () => {
    const loadedNodes = getNodes()
    if ('error' in loadedNodes) setError(loadedNodes)
    else setNodes(loadedNodes)

    return loadedNodes
  }

  const reloadNamespaces = () => {
    const loadedNamespaces = getNamespaces()
    if ('error' in loadedNamespaces) setError(loadedNamespaces)
    else setNamespaces(loadedNamespaces)

    return loadedNamespaces
  }

  // ==========================================================
  useEffect(() => {
    if (!contexts) reloadContexts()
  }, [contexts])

  useEffect(() => {
    if (!nodes) reloadNodes()
  }, [nodes])

  useEffect(() => {
    if (!namespaces) reloadNamespaces()
  }, [namespaces])

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

          namespaces: namespaces,
          reloadNamespaces: reloadNamespaces
        }}
      >
        <Layout>{page === 0 && <Nodes index={0} />}</Layout>
      </K8sContext.Provider>
    </AppContext.Provider>
  )
}

// ==========================================================
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
