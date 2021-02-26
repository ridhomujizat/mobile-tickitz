import React from 'react'
import Logo from '../../assets/images/logo/tickitz-purple.png'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

const LogoPurple = (props) => {
  const navigation = useNavigation()
  const { height, width } = props
  const gotohome = () => {
    navigation.navigate('Home')
  }
  return (
    <TouchableOpacity onPress={gotohome} disabled={props.disabled}>
      <ImageLogo source={Logo} height={height} width={width} />
    </TouchableOpacity>
  )
}

const ImageLogo = styled.Image`
width: ${props => props.width};
height: ${props => props.height};
resizeMode: contain;
`

export default LogoPurple
