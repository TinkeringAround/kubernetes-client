import React, { FC, useContext } from 'react'

// Types
import { TNode } from '../../types'

// Context
import { K8sContext } from '../../context'

// Styles
import { colors } from '../../styles'

// Components
import NodePie from '../node/pie'

// ==========================================================
const Dashboard: FC = () => {
  const { nodes } = useContext(K8sContext)

  return (
    <div
      style={{
        width: 'inherit',
        height: 'inherit',

        padding: '1rem'
      }}
    >
      <h1 style={{ margin: '0 0 2rem', color: colors['blue'], fontSize: '3rem' }}>Nodes</h1>
      <div
        style={{
          height: '40%',
          width: 'calc(100% - 2rem)',

          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {nodes?.map((node: TNode, index: number) => (
          <NodePie key={'Node-' + index} node={node} margin={index === 0 ? '0' : undefined} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
