import React, { Component } from 'react'
import styled from 'styled-components/native'

import { LogoPurple } from '../component/Logo'
import { InputText, InputPassword } from '../component/Form'
import Button from '../component/Button'
import { TouchableOpacity, View } from 'react-native'
import DimmedLoading from '../component/LoadingScreen/whiteLoading'
import { showingMessage } from '../helper/flashMessage'

import { connect } from 'react-redux'
import { login } from '../redux/actions/auth'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false
  }
  onChange (key, value) {
    this.setState({ [key]: value })
  }
  async submitLogin () {

    const { email, password } = this.state
    this.setState({ isLoading: true })
    await this.props.login(email, password)

    if (this.props.auth.token) {
      await showingMessage("Login Success", "Happy Wathcing", 'success')
      this.setState({ isLoading: false })
      this.props.navigation.navigate('Home')
    } else {
      await showingMessage("Login Failed", this.props.auth.errorMsg, 'danger')
      this.setState({ isLoading: false })
    }
  }
  render () {
    return (
      <>
        <ContainerPage>
          <View>
            <View>
              <LogoPurple width={'80px'} height={'40px'} disabled />
              <TitleLarge>Sign In</TitleLarge>
              <InputText
                label='Email'
                placeholder='Write your email'
                autoCompleteType='email'
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText={(email) => this.onChange('email', email)}
              />
              <PasswordInput
                label='Password'
                placeholder='Write your Password'
                onChangeText={(password) => this.onChange('password', password)}
              />
              <Button onPress={() => this.submitLogin()}>Sign In</Button>
            </View>
            <ForgetPasswordRow >
              <View>
                <ForgetPasswordQue>Forgot your password?</ForgetPasswordQue>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                <ForgetPasswordText> Reset now</ForgetPasswordText>
              </TouchableOpacity>
            </ForgetPasswordRow>
          </View>
        </ContainerPage>
        <DimmedLoading isLoading={this.state.isLoading} />
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
const ForgetPasswordQue = styled.Text`
  font-size: 16px
  margin: auto
  margin-top: 20px
  font-family: Mulish-Medium
  color: #6E7191
`
const ForgetPasswordRow = styled.Text`
  margin: auto
  margin-top: 20px
  height: 50px
  align-items: center

`
const ForgetPasswordText = styled(ForgetPasswordQue)`
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
const mapStateToPros = state => ({
  auth: state.auth
})

const mapDispatchToProps = { login }
export default connect(mapStateToPros, mapDispatchToProps)(SignIn)
