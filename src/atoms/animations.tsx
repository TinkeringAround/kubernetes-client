import posed from 'react-pose'
import { Box } from 'grommet'
import styled from 'styled-components'

// Styles
import { colors } from '../styles/'

// Consts
const SHORT = 300
const MIDDLE = 350

// ===================================================================
export const SBox = styled(Box)`
  position: relative;
  width: inherit;
  height: inherit;
  min-height: 100vh;

  background: ${colors['lightGrey']};
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

export const SBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
`

export const ABackground = posed(SBackground)({
  exit: { opacity: 0, transition: { duration: MIDDLE } },
  enter: { opacity: 1, transition: { duration: MIDDLE } }
})

// ===================================================================
const SErrorDialog = styled(Box)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;

  width: 350px;
  height: 175px;
  padding: 1rem;

  background: ${colors['white']};
  box-shadow: 0px 0px 20px 1px rgba(200, 214, 216, 0.25);
  border-radius: 15px;

  justify-content: space-between;
`

export const AErrorDialog = posed(SErrorDialog)({
  exit: { opacity: 0, top: '0rem', transition: { duration: MIDDLE } },
  enter: { opacity: 1, top: '2rem', transition: { duration: MIDDLE } }
})

// ===================================================================
const SLogDialog = styled(Box)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 60;

  width: 85vw;
  height: 90vh;
  padding: 1.5rem 2rem;

  background: ${colors['white']};
  box-shadow: 0px 0px 20px 1px rgba(200, 214, 216, 0.25);
  border-radius: 15px;

  justify-content: space-between;
`

export const ALogDialog = posed(SLogDialog)({
  exit: { opacity: 0, top: '45%', transition: { duration: MIDDLE } },
  enter: { opacity: 1, top: '50%', transition: { duration: MIDDLE } }
})

// ===================================================================
const SDropzoneDialog = styled(Box)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 80;

  width: 60vw;
  height: 60vh;
  padding: 1.5rem 2rem;

  background: ${colors['white']};
  box-shadow: 0px 0px 20px 1px rgba(200, 214, 216, 0.25);
  border-radius: 15px;

  align-items: center;
  justify-content: center;
`
export const ADropzoneDialog = posed(SDropzoneDialog)({
  exit: { opacity: 0, transition: { duration: SHORT } },
  enter: { opacity: 1, transition: { duration: SHORT } }
})

// ===================================================================
const SSideNav = styled(Box)`
  position: fixed;
  right: 0;
  top: 0;

  z-index: 75;

  width: 250px;
  height: 100vh;

  padding: 2rem 1rem;
  background: ${colors['white']};

  cursor: default;
`

export const ASideNav = posed(SSideNav)({
  exit: { opacity: 0, right: -200, transition: { duration: SHORT } },
  enter: { opacity: 1, right: 0, transition: { duration: SHORT } }
})
