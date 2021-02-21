import React from 'react'
import Logo from '../../assets/images/logo/tickitz-purple.png'
import styled from 'styled-components/native'

const LogoPurple = (props) => {
  const { height, width } = props
  return (
    <>
      <ImageLogo source={Logo} height={height} width={width} />
    </>
  )
}

const ImageLogo = styled.Image`
width: ${props => props.width};
height: ${props => props.height};
resizeMode: contain;
`

export default LogoPurple
