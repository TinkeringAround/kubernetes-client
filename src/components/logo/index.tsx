import React, { FC } from 'react'

// Assets
import logo from '../../assets/k8sLogo.png'

// ==========================================================
interface Props {
  size?: string
}

// ==========================================================
const Logo: FC<Props> = ({ size = '3rem' }) => (
  <img alt="K8s Logo" src={logo} style={{ width: size, height: size }} />
)

export default Logo
