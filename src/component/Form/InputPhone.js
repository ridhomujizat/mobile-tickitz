import React from 'react'
import styled from 'styled-components/native'

function InputPhone (props) {
  return (
    <Row style={props.style}>
      <Label>{props.label}</Label>
      <Wrapper>
        <NumberId>
          +62
        </NumberId>
        <FormInput
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
        />
      </Wrapper>
    </Row>
  )
}

const Row = styled.View`
`

const FormInput = styled.TextInput`
  padding: 15px 0px 15px 10px
  font-size: 16px
  borderLeftWidth: 1px
  borderColor: #A0A3BD
  font-family: Mulish-Medium
  width: 87%
`
const Wrapper = styled.View`
  flex-direction: row
  align-items: center
  border: solid 1px #A0A3BD
  border-radius: 16px

`
const Label = styled.Text`
  font-size: 16px
  margin-bottom: 10px
  color: #A0A3BD
  font-family: Mulish-Medium
`
const NumberId = styled.Text`
  font-family: Muslih-Medium
  font-size: 16px
  padding-horizontal: 10px
  color: #A0A3BD
`

export default InputPhone
