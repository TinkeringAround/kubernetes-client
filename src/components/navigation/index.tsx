import React, { FC } from 'react'

// Styles
import { colors } from '../../styles'

// ==========================================================
interface Props {}

// ==========================================================
const Navigation: FC<Props> = () => {
  return (
    <div
      style={{
        width: 65,
        height: '100%',

        background: colors['blue'],

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    ></div>
  )
}

export default Navigation
