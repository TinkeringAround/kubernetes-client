import React, { FC } from 'react'
import styled from 'styled-components'

// Styles
import { colors } from '../styles'

// ==========================================================
const SInput = styled.input`
  width: 100%;
  height: 40px;

  padding: 0.25rem 0.5rem 0.25rem 1rem;

  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  text-overflow: ellipsis;
  color: ${colors['black']};
  text-align: center;

  border: none;
  border-radius: 10px;
  background-color: ${colors['lightGrey']};

  ::placeholder {
    color: ${colors['grey']};
  }

  :focus {
    outline: none;
  }
`

// ==========================================================
interface Props {
  value: string
  setValue: (value: string) => void

  placeholder?: string
  type?: string
}

// ==========================================================
const Input: FC<Props> = ({ value, setValue, placeholder = '', type = '' }) => (
  <SInput
    type={type}
    value={value}
    onChange={event => setValue(event.target.value)}
    placeholder={placeholder}
  />
)

export default Input
