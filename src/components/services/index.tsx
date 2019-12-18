import React, { FC, useContext, useEffect } from 'react'
import { Box, Heading } from 'grommet'

// Styles
import { colors } from '../../styles'

// Context
import { K8sContext, AppContext } from '../../context'

// ==========================================================
interface Props {
  index: number
}

// ==========================================================
const Services: FC<Props> = ({ index }) => {
  const { page } = useContext(AppContext)
  const { reloadServices } = useContext(K8sContext)

  useEffect(() => {
    if (page === index) reloadServices()
  }, [page])

  return (
    <Box pad="2rem" width="inherit" height="inherit" justify="between">
      <Heading level="1" size="3rem" color={colors['blue']} margin="0">
        Services
      </Heading>
    </Box>
  )
}

export default Services
