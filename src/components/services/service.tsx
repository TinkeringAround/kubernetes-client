import React, { FC } from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'

// Types
import { TService, TServicePort } from '../../types'

// Styles
import { colors } from '../../styles'

// Atoms
import Icon from '../../atoms/icons'

// ==========================================================
const SService = styled(Box)<{ active: boolean }>`
  width: 100%;
  height: 3.25rem;
  margin-bottom: 1rem;

  background: ${({ active }) => (active ? colors['blue'] : 'white')};
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  transition: all 0.25s ease;
  cursor: default;

  :hover {
    transform: translateX(-5px);
    background: ${({ active }) => (active ? colors['blue'] : colors['hoverBlue'])};
  }
`

const SServiceType = styled(Box)<{ active: boolean }>`
  width: 10%;
  padding: 0.5rem;

  background: ${({ active }) => (active ? 'white' : colors['blue'])};
  border-radius: 5px;

  align-items: center;
`

// ==========================================================
interface Props {
  service: TService
  active: boolean
  select: (service: TService) => void
  onDoubleClick?: (service: TService) => void
}

// ==========================================================
const Service: FC<Props> = ({ service, active, select, onDoubleClick = undefined }) => (
  <SService
    active={active}
    onDoubleClick={onDoubleClick ? () => onDoubleClick(service) : undefined}
  >
    <Box width="30%" pad={{ left: '1rem' }}>
      <Text size="0.8rem" weight="bold" color={active ? 'white' : colors['black']} truncate>
        {service.name}
      </Text>
    </Box>
    <SServiceType active={active}>
      <Text size="0.65rem" weight="bold" color={active ? colors['blue'] : 'white'}>
        {service.type}
      </Text>
    </SServiceType>
    <Box width="10%" align="center">
      {service.ports.map((port: TServicePort, index: number) => (
        <Text
          key={'Service-Port-' + index}
          size="0.65rem"
          color={active ? 'white' : colors['black']}
        >
          <strong>{port.name + ': '}</strong>
          {port.port}
        </Text>
      ))}
    </Box>
    <Box width="15%" justify="center" direction="row">
      <Icon
        type={active ? 'stop' : 'start'}
        color={active ? 'white' : 'blue'}
        size="2.5rem"
        onClick={() => select(service)}
      />
    </Box>
  </SService>
)

export default Service
