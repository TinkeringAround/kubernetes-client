import React, { FC, CSSProperties } from 'react'
import styled from 'styled-components'
import { Box, Text } from 'grommet'

// Styles
import { colors } from '../styles'

// Atoms
const SSelect = styled.select<{ disabled: boolean }>`
  padding: 0.5rem;

  background: ${({ disabled }) => (disabled ? colors['lightGrey'] : colors['blue'])};
  border: none;
  border-radius: 5px;

  appearance: none;
  outline: none;

  font-family: inherit;
  font-size: 0.75rem;
  font-weight: bold;
  text-align-last: center;
  color: ${({ disabled }) => (disabled ? colors['grey'] : colors['white'])};

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
  disabled?: boolean
  style?: CSSProperties
}

// ==========================================================
const Dropdown: FC<Props> = ({
  options,
  value,
  select,
  label = null,
  width = '25%',
  margin = '0',
  disabled = false,
  style = undefined
}) => (
  <Box margin={margin} width={width} style={style}>
    {label && (
      <Text size=".8rem" weight="bold" color={colors['black']}>
        {label}
      </Text>
    )}
    <SSelect
      id={'Selection-' + value}
      value={value}
      onChange={(event: any) => select(event.target.value)}
      disabled={disabled}
    >
      {options.map((option: string, index: number) => (
        <option key={'Option-' + index} value={option}>
          {option}
        </option>
      ))}
    </SSelect>
  </Box>
)

export default Dropdown
