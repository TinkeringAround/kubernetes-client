import React, { FC } from 'react'

// Styles
import { sizes } from '../../styles'

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
    <div style={{ height: '100vh', width: `calc(100vw - ${sizes['navigation']}px)` }}>
      {children}
    </div>
  </div>
)

export default Layout
