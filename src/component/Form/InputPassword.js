import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import peekeye from '../../assets/images/logo/eye2.png'
import peeked from '../../assets/images/logo/eye1.png'

function InputText (props) {
  const [peek, setPeek] = useState(true)

  const changePicked = () => {
    setPeek(!peek)
  }
  return (
    <Row style={props.style}>
      <Label>{props.label}</Label>
      <Wrapper>
        <FormInput
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={peek}
        />
        <TouchableOpacity onPress={changePicked}>
          {peek
            ? (<Icon source={peeked} />)
            : (<Icon source={peekeye} />)}
        </TouchableOpacity>
      </Wrapper>
    </Row>
  )
}

const Row = styled.View`
`
const FormInput = styled.TextInput`
  padding: 15px 24px
  font-size: 16px
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
const Icon = styled.Image`
  height: 20px
  width: 20px
`

export default InputText
