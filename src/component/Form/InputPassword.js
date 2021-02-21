import React from 'react'
import styled from 'styled-components/native'

function InputText (props) {
  return (
    <Row style={props.style}>
      <Label>{props.label}</Label>
      <FormInput
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={true}
      />
    </Row>
  )
}

const Row = styled.View`
`
const FormInput = styled.TextInput`
  padding: 15px 24px
  border: solid 1px #A0A3BD
  border-radius: 16px
  font-size: 16px
  font-family: Mulish-Medium
`

const Label = styled.Text`
  font-size: 16px
  margin-bottom: 10px
  color: #A0A3BD
  font-family: Mulish-Medium
`

export default InputText
