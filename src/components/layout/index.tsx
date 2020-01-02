import React, { FC, useCallback, useContext } from 'react'
import { Box } from 'grommet'
import { useDropzone } from 'react-dropzone'

// Styles
import { sizes, colors } from '../../styles'

// Context
import { K8sContext } from '../../context'

// Components
import Navigation from '../navigation/'
import Settings from '../settings'

// Partials
import DropzoneDialog from './dropzone'

// ==========================================================
const Layout: FC = ({ children }) => {
  const { setKubeconfig } = useContext(K8sContext)

  // ==========================================================
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach((file: any) => console.log('File:', file))
      setKubeconfig(acceptedFiles.map((file: any) => file.path))
    },
    [setKubeconfig]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  // ==========================================================
  return (
    <Box
      width="100vw"
      height="100vh"
      direction="row"
      style={{ position: 'relative', cursor: 'auto' }}
      {...getRootProps()}
    >
      <Settings />

      <Navigation />
      <Box
        id="layout-content"
        height="100vh"
        width={`calc(100vw - ${sizes['navigation']}px)`}
        background={colors['lightGrey']}
      >
        {children}
      </Box>

      <DropzoneDialog show={isDragActive} props={getInputProps()} />
    </Box>
  )
}

export default Layout
