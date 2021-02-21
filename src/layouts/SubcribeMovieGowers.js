import React from 'react'
import styled from 'styled-components/native'
import { InputText } from '../component/Form'
import Button from '../component/Button'
function Subcribe () {
  return (
    <Row>
      <Col>
        <TextRow>
          <Text>Be the vanguard of the</Text>
          <MoviegoersText>Moviegoers</MoviegoersText>
          <InputEmail
            placeholder='Type your email'
          />
          <ButtonEmail>Join Now</ButtonEmail>
          <TextInfo>
            By joining you as a Tickitz member,
            we will always send you the
            latest updates via email .
          </TextInfo>
        </TextRow>
      </Col>
    </Row>
  )
}

const Row = styled.View`
  padding: 20px
`
const Col = styled.View`
  background-color: #fff
  height: 375px
  elevation: 2
`
const TextRow = styled.View`
  margin-horizontal: auto
  margin-vertical: 40px
`
const Text = styled.Text`
  text-align: center
  font-family: Mulish-Medium
  font-size: 14px
  color: #6E7191
`
const MoviegoersText = styled.Text`
  color: #5F2EEA
  font-family: Mulish-Bold
  text-align: center
  font-size: 30px
`
const InputEmail = styled(InputText)`
  padding-horizontal: 30px
`
const ButtonEmail = styled(Button)`
  margin-top: 20px
  padding-horizontal: 30px
`
const TextInfo = styled(Text)`
  font-size: 12px
  padding-horizontal: 40px
  margin-top: 20px
`
export default Subcribe
