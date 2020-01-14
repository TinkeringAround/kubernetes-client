import React, { FC } from 'react'

// Styles
import { TColor, colors } from '../styles'

// ==========================================================
interface Props {
  width?: string
  height?: string
  padding?: string
  margin?: string

  background?: TColor
  color?: TColor
  fontSize?: string

  justify?: 'center' | 'start'

  disabled?: boolean
  onClick?: () => void
}

// ==========================================================
const Button: FC<Props> = ({
  children,
  width = 'auto',
  height = 'auto',
  padding = '.5rem',
  margin = '0',

  background = 'blue',
  color = 'white',
  fontSize = '.75rem',

  justify = 'center',

  disabled = false,
  onClick = null
}) => (
  <button
    disabled={disabled}
    style={{
      width: width,
      height: height,
      margin: margin,
      padding: padding,

      fontSize: fontSize,
      fontWeight: 'bold',
      color: disabled ? colors['lightGrey'] : colors[color],

      background: disabled ? colors['grey'] : colors[background],
      borderRadius: 5,
      border: 'none',

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: justify,

      outline: 'none',
      transition: 'all 0.25s ease',
      cursor: disabled ? 'default' : 'pointer'
    }}
    onClick={() => {
      if (!disabled && onClick) onClick()
    }}
  >
    {children}
  </button>
)

export default Button
