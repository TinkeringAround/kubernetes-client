import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Styles
import './styles/global.css'

// Components
import Layout from './components/layout'
import Dashboard from './components/dashboard'
import Navigation from './components/navigation'

// ==========================================================
const App: FC = () => {
  return (
    <Layout>
      <Navigation />
      <Dashboard />
    </Layout>
  )
}

// ==========================================================
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
