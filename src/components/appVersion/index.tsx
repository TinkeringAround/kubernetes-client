import React, { useState, useEffect, FC, useContext } from 'react'
import { Text } from 'grommet'

// Styles
import { colors } from '../../styles'

// Context
import { AppContext } from '../../context'

// Driver
import { getAppVersion } from '../../driver/ipc'

// ==========================================================
const AppVersion: FC = () => {
  const { setError } = useContext(AppContext)
  const [version, setVersion] = useState<string>('')

  // ==========================================================
  useEffect(() => {
    if (version === '') {
      const loadedVersion = getAppVersion()

      if (typeof loadedVersion === 'string') setVersion(loadedVersion)
      else setError(loadedVersion)
    }
  }, [version, setError])

  // ==========================================================
  return (
    <Text
      size=".6rem"
      color={colors['black']}
      style={{ position: 'absolute', bottom: '1rem', cursor: 'default' }}
    >
      {`v${version}`}
    </Text>
  )
}

export default AppVersion
