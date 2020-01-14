import React, { FC, useContext, useEffect, useState, Fragment } from 'react'
import { Box, Text, Heading } from 'grommet'
import styled from 'styled-components'
import { PoseGroup } from 'react-pose'

// Types
import { TNamespace } from '../../types'

// Styles
import { colors } from '../../styles'

// Context
import { K8sContext, AppContext } from '../../context'

// Atoms
import Dropdown from '../../atoms/dropdown'
import Button from '../../atoms/button'
import Icon from '../../atoms/icons'
import { ASideNav, ABackground } from '../../atoms/animations'

// ==========================================================
const STopNavigation = styled(Box)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10;
`

const SContext = styled(Box)`
  width: 100%;
  height: 2rem;

  margin-bottom: 0.75rem;

  background: transparent;

  align-items: center;
  justify-content: space-between;

  cursor: default;
`

// ==========================================================
const TopNavigation: FC = () => {
  const { page } = useContext(AppContext)
  const {
    contexts,
    setContext,
    deleteContext,
    namespaces,
    currentNamespace,
    setNamespace,
    reloadNamespaces
  } = useContext(K8sContext)
  const [namespaceNames, setNamespaceNames] = useState<Array<string>>([])
  const [showSideNav, setShowSideNav] = useState<boolean>(false)

  // ==========================================================
  useEffect(() => {
    if (page > 0 && namespaces && namespaces.length > 0)
      setNamespaceNames(namespaces.map((ns: TNamespace) => ns.name))
  }, [page, namespaces])

  useEffect(() => {
    if (!namespaces && contexts) reloadNamespaces()
  }, [namespaces, contexts, reloadNamespaces])

  const multipleNamespaces = namespaces && namespaces.length > 0 ? true : false
  const multipleCluster = contexts && contexts.contexts.length > 1 ? true : false

  // ==========================================================
  return (
    <Fragment>
      {contexts && (
        <STopNavigation direction="row">
          {page > 0 && page < 3 && namespaces && (
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
            <Button
              margin="1rem 1rem 0 1rem"
              width="150px"
              disabled={!multipleCluster}
              onClick={() => {
                if (multipleCluster) setShowSideNav(!showSideNav)
              }}
            >
              {contexts.activeContext}
            </Button>
          )}

          {/* Dialogs */}
          <PoseGroup flipMove={false}>
            {showSideNav && (
              <ASideNav key="SideNavigation">
                <Heading level="1" margin="0 0 1rem" size="3rem" color={colors['blue']}>
                  Cluster
                </Heading>
                {contexts &&
                  contexts.contexts.map((context: string, index: number) => (
                    <SContext
                      key={'Settings-Dialog-Context-' + index}
                      direction="row"
                      align="center"
                    >
                      <Button
                        width="calc(100% - 2.5rem)"
                        background={context === contexts.activeContext ? 'blue' : 'grey'}
                        onClick={() => {
                          setContext(context)
                          setShowSideNav(false)
                        }}
                      >
                        <Text size="0.8rem" weight="bold" color={colors['white']}>
                          {context}
                        </Text>
                      </Button>

                      <Icon
                        type="trash"
                        color="blue"
                        size="2rem"
                        iconSize="50%"
                        onClick={() => deleteContext(context)}
                      />
                    </SContext>
                  ))}
              </ASideNav>
            )}

            {showSideNav && (
              <ABackground key="SideNavigation-Background" onClick={() => setShowSideNav(false)} />
            )}
          </PoseGroup>
        </STopNavigation>
      )}
    </Fragment>
  )
}

export default TopNavigation
