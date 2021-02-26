import React from 'react'
import styled from 'styled-components/native'

const Button = (props) => {
  return (
    <ButtonCostum
      onPress={props.onPress}
      radius={props.radius}
      style={props.style}
      disabled={props.disabled}>
      <ButtonStyle
        color={props.color}
        radius={props.radius}
        height={props.height}
        width={props.width}
        border={props.border}
      >
        <ButtonText
          fontSize={props.fontSize}
          fontColor={props.fontColor}
        >{props.children}</ButtonText>
      </ButtonStyle>
    </ButtonCostum>
  )
}

const ButtonCostum = styled.TouchableHighlight`
    border-radius : ${props => props.radius || '16px'}

`
const ButtonStyle = styled.View`
  background-color: ${props => props.color || '#5F2EEA'}
  border-radius : ${props => props.radius || '16px'}
  height:  ${props => props.height || '58px'}
  width: ${props => props.width || 'auto'}
  border: ${props => [props.border || 0]}
`
const ButtonText = styled.Text`
  color: ${props => props.fontColor || '#fff'}
  font-size: ${props => props.fontSize || '16px'}
  margin: auto
  padding: 20px
  font-family: Mulish-Medium
`
export default Button
