import React, { FC } from 'react'

// Components
import Navigation from '../navigation/'

// ==========================================================
const Layout: FC = ({ children }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',

      display: 'flex',
      flexDirection: 'row'
    }}
  >
    <Navigation />
    <div style={{ height: '100%', width: 'calc(100% - 60px)' }}>{children}</div>
  </div>
)

export default Layout
