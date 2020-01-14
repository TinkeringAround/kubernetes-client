import React, { FC, useContext, Fragment } from 'react'
import { Box } from 'grommet'

// Styles
import { sizes } from '../../styles'

// Context
import { AppContext } from '../../context'

// Atoms
import Icon from '../../atoms/icons'

// Components
import Logo from '../logo'
import AppVersion from '../appVersion'

// ==========================================================
const Navigation: FC = () => {
  const { page, setPage } = useContext(AppContext)

  return (
    <Box
      width={sizes['navigation']}
      height="100%"
      background="white"
      style={{ position: 'relative' }}
      align="center"
    >
      <Box pad={{ top: '1rem' }} align="center">
        <Logo />
        {page >= 0 && (
          <Fragment>
            <Icon
              type="server"
              selected={page === 0}
              margin="5rem 0 .75rem"
              onClick={() => setPage(0)}
            />
            <Icon
              type="service"
              selected={page === 1}
              margin="0 0 .75rem"
              onClick={() => setPage(1)}
            />
            <Icon type="pod" selected={page === 2} margin="0 0 .75rem" onClick={() => setPage(2)} />
            <Icon type="settings" selected={page === 3} onClick={() => setPage(3)} />
          </Fragment>
        )}
      </Box>

      <AppVersion />
    </Box>
  )
}

export default Navigation
