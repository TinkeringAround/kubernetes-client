import React, { FC, useContext } from 'react'
import { Box, Heading, Text } from 'grommet'

// Context
import { SettingsContext } from '../../context'

// Styles
import { colors } from '../../styles'

// Components
import Input from '../../atoms/input'

// ==========================================================
const Settings: FC = () => {
  const { port, setPort } = useContext(SettingsContext)

  // ==========================================================
  return (
    <Box
      pad="1rem 2rem"
      width="inherit"
      height="inherit"
      justify="between"
      style={{ position: 'relative' }}
    >
      <Heading level="1" size="3rem" color={colors['blue']} margin="0">
        Settings
      </Heading>

      <Box height="85%" width="100%">
        <Box
          pad="1rem"
          direction="row"
          background="white"
          justify="between"
          align="center"
          style={{ borderRadius: 10 }}
        >
          <Box>
            <Heading level="2" size="1.25rem" color={colors['black']} margin="0">
              Port Mapping
            </Heading>
            <Text size="0.75rem" color={colors['black']}>
              <i>Changing Port stops all active Port Forwards</i>
            </Text>
          </Box>
          <Box width="150px" margin={{ right: '1.5rem' }}>
            <Input
              type="number"
              value={port + ''}
              setValue={(value: string) => {
                try {
                  const newPort = parseInt(value)
                  setPort(newPort)
                } catch (error) {
                  console.log(error)
                }
              }}
              placeholder="Port"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Settings
