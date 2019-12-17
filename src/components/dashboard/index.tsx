import React, { FC, useContext, useState } from 'react'

// Types
import { TNode } from '../../types'

// Context
import { K8sContext } from '../../context'

// Styles
import { colors } from '../../styles'

// Components
import NodePie from '../node/pie'
import Icon from '../../atoms/icons'

// ==========================================================
const Dashboard: FC = () => {
  const { nodes } = useContext(K8sContext)
  const [pagination, setPagination] = useState<number>(0)

  return (
    <div
      style={{
        width: 'inherit',
        height: 'inherit',

        padding: '1rem'
      }}
    >
      <h1 style={{ margin: '0 0 1.5rem', color: colors['blue'], fontSize: '3rem' }}>Nodes</h1>

      {/* Charts */}
      <div
        style={{
          height: '40%',
          width: 'calc(100% - 2rem)',

          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {nodes?.map((node: TNode, index: number) =>
          index === pagination || index === pagination + 1 ? (
            <NodePie key={'Node-' + index} node={node} margin={index === 0 ? '0' : undefined} />
          ) : (
            <></>
          )
        )}
        <Icon
          type="plus"
          size="3rem"
          margin="0 0 0 1rem"
          disabled={nodes && nodes.length <= 2 ? true : false}
          onClick={() => {
            if (nodes && nodes.length > 2 && pagination + 2 >= nodes.length) setPagination(0)
            else if (nodes && pagination + 2 < nodes.length) setPagination(pagination + 1)
          }}
        />
      </div>
    </div>
  )
}

export default Dashboard
