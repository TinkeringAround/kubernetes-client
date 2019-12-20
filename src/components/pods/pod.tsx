import React, { FC } from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

// Types
import { TPod, TContainer } from '../../types'

// Styles
import { colors } from '../../styles'

// Atoms
import Icon from '../../atoms/icons'

// Driver
import { getTimestamp } from '../../driver/time'

// ==========================================================
const SPod = styled(Box)`
  width: 100%;
  height: 50px;
  margin-bottom: 1rem;

  background: white;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  transition: all 0.25s ease;
  cursor: default;

  :hover {
    transform: translateX(-5px);
    background: ${colors['hoverBlue']};
  }
`

const SContainer = styled(Box)<{ running: boolean }>`
  width: 20px;
  height: 20px;

  background: ${({ running }) => colors[running ? 'green' : 'red']};
  border-radius: 10px;
`

// ==========================================================
interface Props {
  pod: TPod
}

// ==========================================================
const Pod: FC<Props> = ({ pod }) => (
  <SPod>
    <Box width="30%" pad={{ left: '1rem' }}>
      <Text size="0.8rem" weight="bold" color={colors['black']} truncate>
        {pod.name}
      </Text>
    </Box>
    <Box width="15%" align="center">
      {pod.containers.map((container: TContainer, index: number) => (
        <SContainer
          key={'Service-Port-' + index}
          data-for={'Pod-Tooltip-' + index}
          data-tip={`<span><strong>Name: </strong>${
            container.name
          }</span><br /><span><strong>Version: </strong>${
            container.image.split(':')[1]
          }</span><br /><span><strong>Restarts: </strong>${container.restartCount}</span>`}
          data-html={true}
          running={container.running}
        >
          <ReactTooltip id={'Pod-Tooltip-' + index} />
        </SContainer>
      ))}
    </Box>
    <Box width="15%" align="center">
      <Text size="0.65rem" weight="bold" color={colors['black']}>
        {getTimestamp(pod.creation)}
      </Text>
    </Box>

    <Box width="15%" justify="center" direction="row">
      <Icon type="info" color="blue" size="2.5rem" />
    </Box>
  </SPod>
)
export default Pod
