import React, { useContext, FC } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

// Context
import { AppContext } from '../../context'

// Atoms
import Button from '../../atoms/button'
import Icon from '../../atoms/icons'

// ==========================================================
const SSettings = styled(Box)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
`

// ==========================================================
const Settings: FC = () => {
  const { page } = useContext(AppContext)

  return (
    <SSettings>
      <Button color="white" background="blue" padding="0.5rem .75rem 0.5rem .5rem">
        <Icon type="cluster" size="2rem" color="white" />
        Change Cluster
      </Button>
    </SSettings>
  )
}

export default Settings
