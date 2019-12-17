import React, { FC } from 'react'
import { ResponsivePie } from '@nivo/pie'

// Styles
import { colors } from '../../styles'

// Types
import { TNode } from '../../types'
type TNodeSpec = 'cpu' | 'memory'

// Dummy Data
const getData = (mode: TNodeSpec, node: TNode) => {
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
const modes: Array<TNodeSpec> = ['cpu', 'memory']

// ==========================================================
interface Props {
  node: TNode
  width?: string
  height?: string
  margin?: string
}

// ==========================================================
const NodePie: FC<Props> = ({ node, width = '45%', height = '100%', margin = '0 0 0 2.5%' }) => {
  const pieMargin = 2

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
        justifyContent: 'space-around'
      }}
    >
      <h1
        style={{
          margin: '0 0 0 1rem',
          fontSize: '1.25rem',
          color: colors['blue']
        }}
      >
        {node.name}
      </h1>
      <div
        style={{
          width: '100%',
          height: `calc(${height} - 4rem)`,

          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {modes.map((mode: TNodeSpec) => (
          <div
            key={mode}
            style={{
              width: '50%',
              height: '85%'
            }}
          >
            <ResponsivePie
              data={getData(mode, node)}
              margin={{ top: pieMargin, right: pieMargin, bottom: pieMargin, left: pieMargin }}
              innerRadius={0.7}
              padAngle={5}
              cornerRadius={2}
              colors={[colors['green'], colors['blue']]}
              borderWidth={2}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              enableRadialLabels={false}
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={5}
              radialLabelsTextColor={colors['darkGrey']}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={2}
              radialLabelsLinkColor={{ from: 'color' }}
              enableSlicesLabels={false}
              tooltip={e => <span>{`${e.value}${mode === 'cpu' ? 'm' : ' MByte'}`}</span>}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default NodePie
