import React, { FC, useContext, useCallback } from 'react'
import { Box, Heading, Text } from 'grommet'

// Styles
import { colors } from '../../styles'

// Context
import { K8sContext } from '../../context'

// Types
import { TService } from '../../types'

// Components
import Service from './service'

// Consts
const headerSize = '0.65rem'

// ==========================================================
const Services: FC = () => {
  const { services, currentService, setService } = useContext(K8sContext)

  const toggleService = useCallback(
    (service: TService) => setService(currentService?.name === service.name ? null : service),
    [currentService, setService]
  )

  return (
    <Box pad="1rem 2rem" width="inherit" height="inherit" justify="between">
      <Heading level="1" size="3rem" color={colors['blue']} margin="0">
        Services
      </Heading>

      <Box height="85%" width="100%" align="center">
        {/* Service Header */}
        <Box
          width="100%"
          direction="row"
          justify="between"
          margin={{ bottom: '.5rem' }}
          style={{ cursor: 'default' }}
        >
          <Box width="30%" pad={{ left: '1rem' }}>
            <Text size={headerSize} weight="bold" color={colors['black']}>
              Name
            </Text>
          </Box>
          <Box width="10%" align="center">
            <Text size={headerSize} weight="bold" color={colors['black']}>
              Type
            </Text>
          </Box>
          <Box width="10%" align="center">
            <Text size={headerSize} weight="bold" color={colors['black']}>
              Ports
            </Text>
          </Box>
          <Box width="15%" align="center">
            <Text size={headerSize} weight="bold" color={colors['black']}>
              Actions
            </Text>
          </Box>
        </Box>

        {/* Services */}
        {services &&
          services.map((service: TService, index: number) => (
            <Service
              key={'Service-' + index}
              service={service}
              select={toggleService}
              active={currentService?.name === service.name}
            />
          ))}
      </Box>
    </Box>
  )
}

export default Services
