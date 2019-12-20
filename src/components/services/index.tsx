import React, { FC, useContext, useCallback, useEffect } from 'react'
import { Box, Heading, Text } from 'grommet'

// Styles
import { colors, sizes } from '../../styles'

// Context
import { K8sContext, AppContext } from '../../context'

// Types
import { TService } from '../../types'

// Components
import Service from './service'

// Driver
import { startPortForwardToService, stopPortForward } from '../../driver/ipc'

// ==========================================================
const Services: FC = () => {
  const { page } = useContext(AppContext)
  const { services, currentService, setService, reloadServices, currentNamespace } = useContext(
    K8sContext
  )

  const toggleService = useCallback(
    (service: TService) => {
      if (currentService?.name === service.name) stopPortForward()
      else startPortForwardToService(service, 35000)

      setService(currentService?.name === service.name ? null : service)
    },
    [currentService, setService]
  )

  useEffect(() => {
    if (page === 1 && currentNamespace) reloadServices(currentNamespace)
  }, [page, currentNamespace, reloadServices])

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
            <Text size={sizes['tableHeader']} weight="bold" color={colors['black']}>
              Name
            </Text>
          </Box>
          <Box width="10%" align="center">
            <Text size={sizes['tableHeader']} weight="bold" color={colors['black']}>
              Type
            </Text>
          </Box>
          <Box width="10%" align="center">
            <Text size={sizes['tableHeader']} weight="bold" color={colors['black']}>
              Ports
            </Text>
          </Box>
          <Box width="15%" align="center">
            <Text size={sizes['tableHeader']} weight="bold" color={colors['black']}>
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

        {!services ||
          (services && services.length === 0 && (
            <Text size="0.8rem" margin="1rem" alignSelf="start" color={colors['black']}>
              No Services in this Namespace.
            </Text>
          ))}
      </Box>
    </Box>
  )
}

export default Services
