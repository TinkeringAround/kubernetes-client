import React, { FC, useContext, useEffect } from 'react'
import { Box, Heading, Text } from 'grommet'

// Styles
import { colors, sizes } from '../../styles'

// Context
import { K8sContext, AppContext } from '../../context'

// Types
import { TPod } from '../../types'

// Components
import Pod from './pod'

// ==========================================================
const Pods: FC = () => {
  const { page } = useContext(AppContext)
  const { currentNamespace, reloadPods, pods } = useContext(K8sContext)

  useEffect(() => {
    if (page === 2 && currentNamespace) reloadPods(currentNamespace)
  }, [page, currentNamespace, reloadPods])

  return (
    <Box pad="1rem 2rem" width="inherit" height="inherit" justify="between">
      <Heading level="1" size="3rem" color={colors['blue']} margin="0">
        Pods
      </Heading>

      <Box height="85%" width="100%" align="center">
        {/* Pods Header */}
        <Box
          width="100%"
          direction="row"
          justify="between"
          margin={{ bottom: '.5rem' }}
          style={{ cursor: 'default' }}
        >
          <Box width="30%" pad={{ left: '1rem' }}>
            <Text size={sizes['tableHeader']} weight="bold" color={colors['black']}>
              Name
            </Text>
          </Box>
          <Box width="15%" align="center">
            <Text size={sizes['tableHeader']} weight="bold" color={colors['black']}>
              Containers
            </Text>
          </Box>
          <Box width="15%" align="center">
            <Text size={sizes['tableHeader']} weight="bold" color={colors['black']}>
              Creation
            </Text>
          </Box>
          <Box width="15%" align="center">
            <Text size={sizes['tableHeader']} weight="bold" color={colors['black']}>
              Actions
            </Text>
          </Box>
        </Box>

        {/*  Pods */}
        {pods && pods.map((pod: TPod, index: number) => <Pod key={'Pod-' + index} pod={pod} />)}
      </Box>
    </Box>
  )
}

export default Pods
