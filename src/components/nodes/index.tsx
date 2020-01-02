import React, { FC, useContext, useState, Fragment, useEffect } from 'react'
import { Box, Heading, Text } from 'grommet'

// Types
import { TNode } from '../../types'

// Context
import { K8sContext, AppContext } from '../../context'

// Styles
import { colors } from '../../styles'

// Atoms
import Icon from '../../atoms/icons'

// Components
import NodePie from './pie'

// ==========================================================
const Nodes: FC = () => {
  const { page } = useContext(AppContext)
  const { contexts, nodes, reloadNodes } = useContext(K8sContext)
  const [pagination, setPagination] = useState<number>(0)

  // ==========================================================
  useEffect(() => {
    if (page === 0 && contexts) reloadNodes()
  }, [page, contexts, reloadNodes])

  // ==========================================================
  return (
    <Box
      pad="1rem 2rem"
      width="inherit"
      height="inherit"
      justify="between"
      style={{ position: 'relative' }}
    >
      <Heading level="1" size="3rem" color={colors['blue']} margin="0">
        Nodes
      </Heading>

      <Box height="85%" width="100%" direction="row" align="center">
        {nodes?.map((node: TNode, index: number) =>
          index === pagination || index === pagination + 1 ? (
            <NodePie
              key={'Node-' + index}
              node={node}
              margin={index === 0 ? '0' : undefined}
              width={nodes.length <= 2 ? '50%' : '45%'}
            />
          ) : (
            <Fragment />
          )
        )}
        {nodes && nodes.length > 2 && (
          <Icon
            type="right"
            size="6rem"
            margin="0 0 0 1rem"
            onClick={() => {
              if (nodes && nodes.length > 2 && pagination + 2 >= nodes.length) setPagination(0)
              else if (nodes && pagination + 2 < nodes.length) setPagination(pagination + 1)
            }}
          />
        )}

        {!nodes ||
          (nodes && nodes.length === 0 && (
            <Text size="0.8rem" margin="1rem" alignSelf="start" color={colors['black']}>
              No Nodes found.
            </Text>
          ))}
      </Box>
    </Box>
  )
}

export default Nodes
