import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import Logo from '../../assets/images/logo/tickitz-purple.png'
import styled from 'styled-components/native'

class LogoWhite extends Component {
  render () {
    return (
      <>
        <ImageLogo source={Logo} />
      </>
    )
  }
}

const ImageLogo = styled.Image`
  width: ${props => props.width};
  height: ${props => props.height};
  resizeMode: contain;
`

export default LogoWhite
