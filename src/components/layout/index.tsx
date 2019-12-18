import React, { FC } from 'react'
import { Box } from 'grommet'

// Styles
import { sizes, colors } from '../../styles'

// Components
import Navigation from '../navigation/'
import Settings from '../settings'

// ==========================================================
const Layout: FC = ({ children }) => (
  <Box width="100vw" height="100vh" direction="row" style={{ position: 'relative' }}>
    <Settings />

    <Navigation />
    <Box
      height="100vh"
      width={`calc(100vw - ${sizes['navigation']}px)`}
      background={colors['lightGrey']}
    >
      {children}
    </Box>
  </Box>
)

export default Layout
