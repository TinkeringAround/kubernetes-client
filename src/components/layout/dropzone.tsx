import React, { FC } from 'react'
import { DropzoneInputProps } from 'react-dropzone'
import { PoseGroup } from 'react-pose'
import { Box, Text } from 'grommet'

// Styles
import { colors } from '../../styles'

// Context
import { ABackground, ADropzoneDialog } from '../../atoms/animations'
import Icon from '../../atoms/icons'

// ==========================================================
interface Props {
  show: boolean
  props: DropzoneInputProps
}

// ==========================================================
const Dropzone: FC<Props> = ({ show, props }) => (
  <PoseGroup flipMove={false}>
    {show && (
      <ADropzoneDialog key="Dropzone">
        <Box
          width="5rem"
          height="5rem"
          align="center"
          justify="center"
          background={colors['blue']}
          style={{ borderRadius: 15 }}
        >
          <Icon type="plus" button={false} size="3rem" color="white" />
        </Box>
        <Text margin={{ top: '1rem' }} color={colors['black']}>
          Drop File to Add to Kubeconfig.
        </Text>
        <input {...props} />
      </ADropzoneDialog>
    )}

    {show && <ABackground key="Dropzone-Background" />}
  </PoseGroup>
)

export default Dropzone
