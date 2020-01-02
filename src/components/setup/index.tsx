import React, { FC, useCallback, useContext } from 'react'
import { Box, Heading, Text } from 'grommet'
import { useDropzone } from 'react-dropzone'

// Styles
import { colors } from '../../styles'

// Context
import { K8sContext } from '../../context'

// ==========================================================
const Setup: FC = () => {
  const { setKubeconfig } = useContext(K8sContext)

  // ===================================================================
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach((file: any) => console.log('File:', file))
      setKubeconfig(acceptedFiles.map((file: any) => file.path))
    },
    [setKubeconfig]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  // ===================================================================
  return (
    <Box pad="1rem 2rem" width="inherit" height="inherit" justify="between">
      <Heading level="1" size="3rem" color={colors['blue']} margin="0">
        Setup a Cluster
      </Heading>

      <Box
        height="85%"
        width="100%"
        direction="row"
        pad={{ left: '.5rem' }}
        background={colors['white']}
        {...getRootProps()}
        style={{
          borderRadius: 15,
          borderColor: 'transparent',
          outline: 'none',
          boxShadow: 'none'
        }}
        justify="center"
        align="center"
      >
        {!isDragActive && (
          <Text size="1rem" color={colors['black']}>
            Drag 'n' Drop a Kubeconfig file here, or Click to Select.
          </Text>
        )}
        <input {...getInputProps()} />
      </Box>
    </Box>
  )
}

export default Setup
