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

// ==========================================================
const Navigation: FC = () => {
  const { page, setPage } = useContext(AppContext)

  return (
    <Box width={sizes['navigation'] + 'px'} height="100%" background="white">
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
            <Icon type="pod" selected={page === 2} onClick={() => setPage(2)} />
          </Fragment>
        )}
      </Box>
    </Box>
  )
}

export default Navigation
