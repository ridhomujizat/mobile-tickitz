import React, { Component } from 'react'
import styled from 'styled-components/native'
import { LogoPurple } from '../component/Logo'
import { InputText, InputPassword } from '../component/Form'
import Button from '../component/Button'
import google from '../assets/images/logo/google.png'
import { TouchableOpacity, View } from 'react-native'

class SignUp extends Component {
  onPress = () => {

  }
  render () {
    return (
      <>
        <ContainerPage>
          <LogoPurple width={'80px'} height={'40px'} />
          <TitleLarge>Sign Up</TitleLarge>
          <InputText
            label='Email'
            placeholder='Write your email'
          />
          <PasswordInput
            label='Password'
            placeholder='Write your Password'
          />
          <Button>Sign In</Button>
          <SignUpRow >
            <View>
              <SignUpQue>Do you already have an account?</SignUpQue>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
              <SignUpText> Log in</SignUpText>
            </TouchableOpacity>
          </SignUpRow>
        </ContainerPage>
      </>
    )
  }
}

const ContainerPage = styled.ScrollView`
  padding: 30px
`
const TitleLarge = styled.Text`
  font-size: 26px
  margin-vertical: 40px
  font-family: Mulish-Bold
  font-weight: 600
`
const PasswordInput = styled(InputPassword)`
  margin-top: 24px
  margin-bottom: 40px 
`
const SignUpQue = styled.Text`
  font-size: 16px
  margin: auto
  margin-top: 20px
  font-family: Mulish-Medium
  color: #6E7191
`
const SignUpRow = styled.Text`
  margin: auto
  margin-top: 20px
  height: 50px
  align-items: center

`
const SignUpText = styled(SignUpQue)`
  color: #5F2EEA
  font-weight: 700
  font-family: Mulish-Medium
`
const ButtonQuickSign = styled.View`
 background-color: blue
 width: 48px
 height: 48px
 box-shadow: 0 0 10px yellow;
`

export default SignUp
