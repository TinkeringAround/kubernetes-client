import React, { FC } from 'react'
import styled from 'styled-components'
import { Box, Text } from 'grommet'

// Styles
import { colors } from '../styles'

// Atoms
const SSelect = styled.select`
  padding: 0.5rem;

  background: ${colors['grey']};
  border: none;
  border-radius: 5px;

  appearance: none;
  outline: none;

  font-family: inherit;
  font-size: 0.75rem;
  font-weight: bold;
  text-align-last: center;
  color: ${colors['black']};

  ::-ms-expand {
    display: none;
  }
`

// ==========================================================
interface Props {
  options: Array<string>
  value: string
  select: (selection: string) => void
  label?: string

  width?: string
  margin?: string
}

// ==========================================================
const Dropdown: FC<Props> = ({
  options,
  value,
  select,
  label = null,
  width = '25%',
  margin = '0'
}) => (
  <Box margin={margin} width={width} alignSelf="end">
    {label && (
      <Text size="1rem" weight="bold" color={colors['grey']} margin="0 0 .25rem .25rem">
        {label}
      </Text>
    )}
    <SSelect
      id={'Selection-' + value}
      value={value}
      onChange={(event: any) => select(event.target.value)}
    >
      {options.map((option: string, index: number) => (
        <option key={'Option-' + index}>{option}</option>
      ))}
    </SSelect>
  </Box>
)

export default Dropdown
