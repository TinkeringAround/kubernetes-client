import React, { FC, useContext, useEffect, useState, Fragment } from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

// Context
import { K8sContext, AppContext } from '../../context'

// Types
import { TNamespace } from '../../types'

// Atoms
import Dropdown from '../../atoms/dropdown'

// ==========================================================
const SSettings = styled(Box)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10;
`

// ==========================================================
const Settings: FC = () => {
  const { page } = useContext(AppContext)
  const { contexts, namespaces, currentNamespace, setNamespace, reloadNamespaces } = useContext(
    K8sContext
  )
  const [namespaceNames, setNamespaceNames] = useState<Array<string>>([])

  useEffect(() => {
    if (page > 0 && namespaces && namespaces.length > 0)
      setNamespaceNames(namespaces.map((ns: TNamespace) => ns.name))
  }, [page, namespaces])

  useEffect(() => {
    if (!namespaces && contexts) reloadNamespaces()
  }, [namespaces, contexts, reloadNamespaces])

  const multipleNamespaces = namespaces && namespaces.length > 0 ? true : false
  const multipleCluster = contexts && contexts.contexts.length > 1 ? true : false

  return (
    <Fragment>
      {contexts && (
        <SSettings direction="row">
          {page > 0 && namespaces && (
            <Dropdown
              margin="1rem 0 0"
              width="100px"
              disabled={!multipleNamespaces}
              options={namespaceNames}
              value={currentNamespace ? currentNamespace : ''}
              select={setNamespace}
            />
          )}
          {contexts && (
            <Dropdown
              margin="1rem 1rem 0 1rem"
              width="150px"
              options={contexts.contexts}
              value={contexts.activeContext}
              select={(selection: string) => {
                console.log(selection)
              }}
              disabled={!multipleCluster}
            />
          )}
        </SSettings>
      )}
    </Fragment>
  )
}

export default Settings
