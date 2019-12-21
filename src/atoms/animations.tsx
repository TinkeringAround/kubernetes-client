import posed from 'react-pose'
import { Box } from 'grommet'
import styled from 'styled-components'

// Styles
import { colors } from '../styles/'

// Contsts
const DURATION = 350

// ===================================================================
const SBox = styled(Box)`
  position: relative;
  width: inherit;
  height: inherit;
  min-height: 100vh;
`

export const APage = posed(SBox)({
  exit: {
    opacity: 0,
    left: '2.5%'
  },
  enter: {
    opacity: 1,
    left: 0,
    delay: 500
  }
})

// ===================================================================
export const ASimple = posed(Box)({
  exit: { opactiy: 0 },
  enter: { opacity: 1, delay: (props: any) => (props.delay ? props.delay : 500) }
})

// ===================================================================

const SBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.25);
`

export const ABackground = posed(SBackground)({
  exit: { opacity: 0, transition: { duration: DURATION } },
  enter: { opacity: 1, transition: { duration: DURATION } }
})

// ===================================================================
const SErrorDialog = styled(Box)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 80;

  width: 350px;
  height: 175px;
  padding: 1rem;

  background: ${colors['white']};
  box-shadow: 0px 0px 20px 1px rgba(200, 214, 216, 0.25);
  border-radius: 15px;

  justify-content: space-between;
`

export const AErrorDialog = posed(SErrorDialog)({
  exit: { opacity: 0, top: '0rem', transition: { duration: DURATION } },
  enter: { opacity: 1, top: '2rem', transition: { duration: DURATION } }
})

// ===================================================================
const SLogDialog = styled(Box)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 70;

  width: 85vw;
  height: 90vh;
  padding: 1.5rem 2rem;

  background: ${colors['white']};
  box-shadow: 0px 0px 20px 1px rgba(200, 214, 216, 0.25);
  border-radius: 15px;

  justify-content: space-between;
`

export const ALogDialog = posed(SLogDialog)({
  exit: { opacity: 0, top: '45%', transition: { duration: DURATION } },
  enter: { opacity: 1, top: '50%', transition: { duration: DURATION } }
})
