import React, { FC, useContext, useState, Fragment, useEffect } from 'react'
import { Box, Heading } from 'grommet'

// Types
import { TNode } from '../../types'

// Context
import { K8sContext, AppContext } from '../../context'

// Styles
import { colors } from '../../styles'

// Atoms
import Icon from '../../atoms/icons'

// Components
import NodePie from '../node/pie'

// ==========================================================
interface Props {
  index: number
}

// ==========================================================
const Nodes: FC<Props> = ({ index }) => {
  const { page } = useContext(AppContext)
  const { nodes, reloadNodes } = useContext(K8sContext)
  const [pagination, setPagination] = useState<number>(0)

  useEffect(() => {
    if (page === index) reloadNodes()
  }, [page])

  return (
    <Box pad="2rem" width="inherit" height="inherit" justify="between">
      <Heading level="1" size="3rem" color={colors['blue']} margin="0">
        Nodes
      </Heading>

      <Box height="85%" width="100%" direction="row" align="center">
        {nodes?.map((node: TNode, index: number) =>
          index === pagination || index === pagination + 1 ? (
            <NodePie key={'Node-' + index} node={node} margin={index === 0 ? '0' : undefined} />
          ) : (
            <Fragment />
          )
        )}
        <Icon
          type="right"
          size="6rem"
          margin="0 0 0 1rem"
          disabled={nodes && nodes.length <= 2 ? true : false}
          onClick={() => {
            if (nodes && nodes.length > 2 && pagination + 2 >= nodes.length) setPagination(0)
            else if (nodes && pagination + 2 < nodes.length) setPagination(pagination + 1)
          }}
        />
      </Box>
    </Box>
  )
}

export default Nodes
