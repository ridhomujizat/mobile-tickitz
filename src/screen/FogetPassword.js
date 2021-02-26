import React from 'react'
import styled from 'styled-components/native'
import { LogoPurple } from '../component/Logo'
import { InputText } from '../component/Form'
import Button from '../component/Button'

function ForgotPassword (props) {
  return (
    <>
      <ContainerPage>
        <LogoPurple width={'80px'} height={'40px'} disabled />
        <TitleLarge>Forgot Password</TitleLarge>
        <TextContent>we&apos;ll send a link to your email shortly</TextContent>
        <InputEmail
          label='Email'
          placeholder='Write your email'
        />
        <Button onPress={() => props.navigation.navigate('Home')}>Activate</Button>
      </ContainerPage>
    </>
  )
}

const ContainerPage = styled.ScrollView`
  padding: 30px
`
const TitleLarge = styled.Text`
  font-size: 26px
  margin-Top: 40px
  margin-bottom: 10px
  font-family: Mulish-Bold
  font-weight: 600
`
const TextContent = styled.Text`
  font-size: 15px
  font-family: Mulish-Medium
  color: #6E7191
  margin-bottom: 40px
`
const InputEmail = styled(InputText)`
  margin-bottom: 40px 
`
export default ForgotPassword
