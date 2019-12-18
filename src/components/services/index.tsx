import React, { FC } from 'react'
import { Box, Heading } from 'grommet'

// Styles
import { colors } from '../../styles'

// ==========================================================
const Services: FC = () => (
  <Box pad="2rem" width="inherit" height="inherit" justify="between">
    <Heading level="1" size="3rem" color={colors['blue']} margin="0">
      Services
    </Heading>
  </Box>
)

export default Services
