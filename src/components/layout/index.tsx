import React, { FC } from 'react'

// Assets
import noise from '../../assets/noise.png'

// Styles
import { colors } from '../../styles/'

// ==========================================================
const Layout: FC = ({ children }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',

      background: colors['lightgrey'],
      backgroundImage: `url(${noise})`,
      backgroundPosition: '50%',

      display: 'flex',
      flexDirection: 'row'
    }}
  >
    {children}
  </div>
)

export default Layout
