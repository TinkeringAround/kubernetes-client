import React, { FC } from 'react'
import { Portal } from 'react-portal'
import { PoseGroup } from 'react-pose'
import { Text, Box, Heading } from 'grommet'

// Styles
import { colors } from '../../styles'

// Types
import { TPod, TLog } from '../../types'

// Atoms
import { ABackground, ALogDialog } from '../../atoms/animations'
import Dropdown from '../../atoms/dropdown'

// Consts
const limits = ['10', '25', '50', '100', '250', '500']
// ==========================================================
interface Props {
  pod: TPod
  logs: TLog | null
  limit: string
  close: () => void
  select: (selection: string) => void
}

// ==========================================================
const LogDialog: FC<Props> = ({ pod, logs, limit, close, select }) => (
  <Portal>
    <PoseGroup flipMove={false}>
      {logs != null && (
        <ALogDialog key="ErrorDialog">
          <Box width="100%" height="100%">
            <Box direction="row" justify="between">
              <Heading level="1" size="1.5rem" color={colors['blue']} margin="0" truncate>
                {pod.name}
              </Heading>
              <Dropdown width="10%" options={limits} value={limit} select={select} />
            </Box>
            <Box
              flex="grow"
              background="black"
              margin={{ top: '1rem' }}
              pad=".5rem 1rem 0"
              style={{ maxHeight: 'calc(100% - 3rem)', overflow: 'scroll' }}
            >
              {logs.map((line: string, index: number) => (
                <Text
                  key={'Pod-Log-' + index}
                  size="0.75rem"
                  color="white"
                  wordBreak="break-all"
                  margin={{ bottom: '.1rem' }}
                >
                  {line}
                </Text>
              ))}
            </Box>
          </Box>
        </ALogDialog>
      )}

      {logs != null && <ABackground key="ErrorDialog-Background" onClick={close} />}
    </PoseGroup>
  </Portal>
)

export default LogDialog
