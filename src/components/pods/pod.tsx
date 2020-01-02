import React, { FC, useState, Fragment, useContext, useCallback } from 'react'
import { Box, Text } from 'grommet'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

// Types
import { TPod, TContainer, TLog, TLogLimit } from '../../types'

// Styles
import { colors } from '../../styles'

// Context
import { K8sContext, AppContext } from '../../context'

// Atoms
import Icon from '../../atoms/icons'

// Components
import LogDialog from '../dialogs/log'

// Driver
import { getTimestamp } from '../../driver/time'
import { getLogsForPod } from '../../driver/ipc'

// ==========================================================
const SPod = styled(Box)`
  width: 100%;
  height: 3.25rem;
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
const Pod: FC<Props> = ({ pod }) => {
  const { setError } = useContext(AppContext)
  const { currentNamespace } = useContext(K8sContext)
  const [logs, setLogs] = useState<TLog | null>(null)
  const [limit, setLimit] = useState<TLogLimit>('10')

  const loadLogs = useCallback(
    (logLimit: TLogLimit) => {
      const loadedLogs = getLogsForPod(currentNamespace, pod, logLimit)
      if ('error' in loadedLogs) setError(loadedLogs)
      else setLogs(loadedLogs)
    },
    [currentNamespace, pod, setError]
  )

  const changeLimit = useCallback(
    (selection: string) => {
      var newLimit: TLogLimit = limit
      switch (selection) {
        case '10':
          newLimit = '10'
          break
        case '25':
          newLimit = '25'
          break
        case '50':
          newLimit = '50'
          break
        case '100':
          newLimit = '100'
          break
        case '250':
          newLimit = '250'
          break
        case '500':
          newLimit = '500'
          break
      }

      setLimit(newLimit)
      loadLogs(newLimit)
    },
    [limit, loadLogs]
  )

  const formatImageName = useCallback((imageName: string) => {
    var split = imageName.split(':')[0].split('/')
    var image = split[split.length - 1]
    var tag = imageName.split(':')[1]
    if (tag.length > 15) tag = tag.substring(0, 15) + '...'

    return image + ':' + tag
  }, [])

  return (
    <Fragment>
      {/* Pod */}
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
              }</span><br /><span><strong>Version: </strong>${formatImageName(
                container.image
              )}</span><br /><span><strong>Restarts: </strong>${container.restartCount}</span>`}
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
          <Icon type="info" color="blue" size="2.5rem" onClick={() => loadLogs(limit)} />
        </Box>
      </SPod>

      {/* Log Dialog */}
      <LogDialog
        pod={pod}
        logs={logs}
        limit={limit}
        close={() => setLogs(null)}
        select={changeLimit}
      />
    </Fragment>
  )
}
export default Pod
