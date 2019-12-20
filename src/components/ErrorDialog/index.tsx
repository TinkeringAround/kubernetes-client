import React, { FC } from 'react'
import { Portal } from 'react-portal'
import { PoseGroup } from 'react-pose'
import { Text, Box, Heading } from 'grommet'

// Types
import { TError } from '../../types'

// Styles
import { colors } from '../../styles'

// Atoms
import { ABackground, AErrorDialog } from '../../atoms/animations'
import Button from '../../atoms/button'

// ==========================================================
interface Props {
  error: TError | null
  close: () => void
}

// ==========================================================
const ErrorDialog: FC<Props> = ({ error, close }) => (
  <Portal>
    <PoseGroup flipMove={false}>
      {error != null && (
        <AErrorDialog key="ErrorDialog">
          <Box>
            <Heading level="1" size="1.5rem" color={colors['grey']} margin="0">
              Error
            </Heading>
            <Text
              size="0.9rem"
              color={colors['grey']}
              margin={{ left: '.1rem' }}
              wordBreak="break-all"
              style={{ maxHeight: 'calc(130px - 3.5rem)', overflow: 'hidden auto' }}
            >
              {error.message}
            </Text>
          </Box>
          {/* Buttons */}
          <Box width="100%" direction="row" justify="end" margin={{ top: '5px' }}>
            <Button height="40px" padding="0 1rem" background="red" onClick={close}>
              <Text size="1rem" weight="bold" color="white">
                Dismiss
              </Text>
            </Button>
          </Box>
        </AErrorDialog>
      )}

      {error != null && <ABackground key="ErrorDialog-Background" />}
    </PoseGroup>
  </Portal>
)

export default ErrorDialog
