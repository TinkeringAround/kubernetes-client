import React, { FC } from 'react'
import { Box } from 'grommet'

// Styles
import { sizes, colors } from '../../styles'

// Components
import Navigation from '../navigation/'

// ==========================================================
const Layout: FC = ({ children }) => (
  <Box width="100vw" height="100vh" direction="row">
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
