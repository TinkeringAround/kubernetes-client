import React, { FC, useContext, useEffect, useState } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

// Context
import { K8sContext, AppContext } from '../../context'

// Types
import { TNamespace } from '../../types'

// Atoms
import Button from '../../atoms/button'
import Dropdown from '../../atoms/dropdown'
import Icon from '../../atoms/icons'

// ==========================================================
const SSettings = styled(Box)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;

  display: flex;
  flex-direction: row;
  align-items: center;
`

// ==========================================================
const Settings: FC = () => {
  const { page } = useContext(AppContext)
  const {
    contexts,
    reloadContexts,
    namespaces,
    currentNamespace,
    setNamespace,
    reloadNamespaces,
    reloadServices
  } = useContext(K8sContext)
  const [namespaceNames, setNamespaceNames] = useState<Array<string>>([])

  useEffect(() => {
    if (!contexts) reloadContexts()
  }, [contexts, reloadContexts])

  useEffect(() => {
    if (page === 1) reloadServices()
  }, [page, currentNamespace, reloadServices])

  useEffect(() => {
    if (page === 1 && namespaces && namespaces.length > 0)
      setNamespaceNames(namespaces.map((ns: TNamespace) => ns.name))
  }, [page, namespaces])

  useEffect(() => {
    if (!namespaces) reloadNamespaces()
  }, [namespaces, reloadNamespaces])

  return (
    <SSettings>
      {page > 0 && (
        <Dropdown
          width="150px"
          options={namespaceNames}
          value={currentNamespace ? currentNamespace : ''}
          select={setNamespace}
        />
      )}
      <Button margin="0 0 0 1rem">
        <Icon type="cluster" color="white" size="0.75rem" iconSize="100%" margin="0 0.25rem 0 0" />
        Change Cluster
      </Button>
    </SSettings>
  )
}

export default Settings
