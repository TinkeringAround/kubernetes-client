import React, { FC } from 'react'

// Styles
import { colors } from '../../styles'

// Atoms
import Icon from '../../atoms/icons'

// ==========================================================
interface Props {}

// ==========================================================
const Navigation: FC<Props> = () => {
  return (
    <div
      style={{
        width: 60,
        height: '100%',

        background: 'white',
        borderRight: 'solid 2px ' + colors['lightgrey'],

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          height: '50%',
          width: '100%',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Icon type="server" color="blue" margin="0 0 .75rem" />
        <Icon type="service" color="blue" margin="0 0 .75rem" />
        <Icon type="pod" color="blue" />
      </div>
    </div>
  )
}

export default Navigation
