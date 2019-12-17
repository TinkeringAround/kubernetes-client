import React, { FC, useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie'

// Styles
import { colors } from '../../styles'

// Types
import { TPieMode, TNode } from '../../types'

// Dummy Data
const getData = (mode: TPieMode, node: TNode) => {
  const data = [
    {
      id: mode === 'cpu' ? 'Allocatable CPU' : 'Allocatable Memory',
      label: mode === 'cpu' ? 'Allocatable CPU' : 'Allocatable Memory',
      value: mode === 'cpu' ? node.allocatable.cpu : node.allocatable.memory
    },
    {
      id: mode === 'cpu' ? 'Reserved CPU' : 'Reserved Memory',
      label: mode === 'cpu' ? 'Reserved CPU' : 'Reserved Memory',
      value:
        mode === 'cpu'
          ? node.capacity.cpu - node.allocatable.cpu
          : node.capacity.memory - node.allocatable.memory
    }
  ]
  return data
}

// ==========================================================
interface Props {
  node: TNode
  width?: string
  height?: string
  margin?: string
}

// ==========================================================
const NodePie: FC<Props> = ({ node, width = '45%', height = '100%', margin = '0 0 0 1rem' }) => {
  const [mode, setMode] = useState<TPieMode>('cpu')
  const pieMargin = 20

  useEffect(() => {
    if (mode === 'cpu') setTimeout(() => setMode('memory'), 5000)
  }, [mode])

  return (
    <div
      style={{
        width: width,
        height: height,
        margin: margin,

        background: colors['lightgrey'],
        borderRadius: 10,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <h1
        style={{
          margin: '0 0 0 1rem',
          fontSize: '1.25rem',
          color: colors['blue'],
          alignSelf: 'flex-start'
        }}
      >
        {node.name}
      </h1>
      <div
        style={{
          width: '100%',
          height: `calc(${height} - 4rem)`
        }}
      >
        <ResponsivePie
          data={getData(mode, node)}
          margin={{ top: pieMargin, right: pieMargin, bottom: pieMargin, left: pieMargin }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={[colors['green'], colors['blue']]}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  )
}

export default NodePie
