import React, { FC, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Box, Heading, Text } from 'grommet'
import styled from 'styled-components'

// Styles
import { colors } from '../../styles'

// Types
import { TNode, TSpecTypes } from '../../types'

// Atoms
import Dropdown from '../../atoms/dropdown'
import Icon from '../../atoms/icons'

// Consts
const modes = ['CPU', 'Memory']

// ==========================================================
const SPie = styled(Box)`
  padding: 1rem;

  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px ${colors['shadowGrey']};

  justify-content: space-between;

  transition: all 0.25s ease;
  cursor: default;
`

// ==========================================================
interface Props {
  node: TNode
  width?: string
  height?: string
  margin?: string
}

// ==========================================================
const NodePie: FC<Props> = ({ node, width = '45%', height = '100%', margin = '0 0 0 2.5%' }) => {
  const [mode, setMode] = useState<TSpecTypes>('cpu')
  const pieMargin = 60
  const subtitleSize = '0.5rem'

  const getData = (mode: TSpecTypes, node: TNode) => {
    const data = [
      {
        id: 'Free',
        label: 'Free',
        value: mode === 'cpu' ? node.allocatable.cpu : node.allocatable.memory
      },
      {
        id: 'Reserved',
        label: 'Reserved',
        value:
          mode === 'cpu'
            ? node.capacity.cpu - node.allocatable.cpu
            : node.capacity.memory - node.allocatable.memory
      }
    ]
    return data
  }

  const healthy = node.conditions.status

  return (
    <SPie width={width} height={height} margin={margin}>
      <Box>
        <Heading
          level="1"
          size="1.5rem"
          color={colors[healthy ? 'blue' : 'red']}
          margin="0"
          truncate
          style={{ fontWeight: 'bold' }}
        >
          {node.name}
        </Heading>
        <Box direction="row" margin="0.25rem 0 0">
          <Text size={subtitleSize}>
            <strong>OS: </strong>
            {node.nodeInfo.osImage + ' (' + node.nodeInfo.architecture + ')'}
          </Text>
          <Text size={subtitleSize} margin="0 .5rem">
            <strong>K8s: </strong>
            {node.nodeInfo.kubeletVersion}
          </Text>
          <Text size={subtitleSize}>
            <strong>Runtime: </strong>
            {node.nodeInfo.containerRuntimeVersion}
          </Text>
        </Box>
        <Box margin="1rem 0 0" direction="row" align="center" justify="between">
          <Box
            direction="row"
            pad="0.5rem"
            align="center"
            background={colors[healthy ? 'blue' : 'red']}
            style={{ borderRadius: 5 }}
          >
            <Icon
              type={healthy ? 'check' : 'error'}
              size="1rem"
              color="white"
              margin="0 0.5rem 0 0"
            />
            <Text size="0.75rem" weight="bold" margin="0 0.5rem 0 0">
              {healthy ? 'Ready' : 'Error'}
            </Text>
          </Box>
          <Dropdown
            options={modes}
            value={mode === 'cpu' ? 'CPU' : 'Memory'}
            select={(selection: string) => {
              if (selection.includes(modes[0]) && mode === 'memory') setMode('cpu')
              else if (selection.includes(modes[1]) && mode === 'cpu') setMode('memory')
            }}
          />
        </Box>
      </Box>
      <Box
        width="100%"
        height={`calc(${height} - 6.5rem)`}
        align="center"
        style={{ borderRadius: 10 }}
        background="white"
      >
        <ResponsivePie
          data={getData(mode, node)}
          margin={{ top: pieMargin, right: pieMargin, bottom: pieMargin, left: pieMargin }}
          innerRadius={0.6}
          padAngle={5}
          cornerRadius={2}
          colors={[colors[healthy ? 'blue' : 'red'], colors['grey']]}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={5}
          radialLabelsTextColor={colors['black']}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={2}
          radialLabelsLinkColor={{ from: 'color' }}
          enableSlicesLabels={false}
          tooltip={e => (
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{`${
              mode === 'cpu' ? 'CPU: ' : 'Memory: '
            }${e.value}${mode === 'cpu' ? 'm' : ' MByte'}`}</span>
          )}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </Box>
    </SPie>
  )
}

export default NodePie
