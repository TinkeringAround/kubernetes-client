import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Styles
import './styles/global.css'

// Components
import Layout from './components/layout'
import Dashboard from './components/dashboard'

// Driver
import { getContexts, getNodes } from './driver/ipc'

// Types
import { TContexts } from './types'

// ==========================================================
const App: FC = () => {
  const [contexts, setContexts] = useState<TContexts | null>(null)
  const [nodes, setNodes] = useState<object | null>(null)

  useEffect(() => {
    if (!contexts) {
      const loadedContexts = getContexts()
      if (loadedContexts) setContexts(loadedContexts)
    }
  }, [contexts])

  useEffect(() => {
    if (!nodes) {
      const loadedNodes = getNodes()
      if (loadedNodes) setNodes(loadedNodes)
    }
  }, [nodes])

  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

// ==========================================================
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
