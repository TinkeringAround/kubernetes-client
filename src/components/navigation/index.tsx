import React, { FC, useContext } from 'react'

// Styles
import { sizes } from '../../styles'

// Context
import { AppContext } from '../../context'

// Atoms
import Icon from '../../atoms/icons'

// Components
import Logo from '../logo'

// ==========================================================
const Navigation: FC = () => {
  const { page, setPage } = useContext(AppContext)

  return (
    <div
      style={{
        width: sizes['navigation'],
        height: '100%',

        background: 'white',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          height: '50%',
          width: '100%',

          marginTop: '1rem',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Logo />
        <Icon
          type="server"
          selected={page === 0}
          margin="5rem 0 .75rem"
          onClick={() => setPage(0)}
        />
        <Icon type="service" selected={page === 1} margin="0 0 .75rem" onClick={() => setPage(1)} />
      </div>
    </div>
  )
}

export default Navigation
