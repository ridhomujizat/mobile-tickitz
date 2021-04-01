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
import * as Yup from 'yup'
import { Formik } from 'formik'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required'),
  password: Yup.string()
    .min(8, '*Password must have at least 8 characters')
    .required('Password is required')
})
class SignIn extends Component {
  state = {
    isLoading: false
  }

  componentDidMount () {
    if (this.props.route.params) {
      const { activate } = this.props.route.params
      if (activate) {
        showingMessage("Activate Success", "You can sign with your account right now", 'success')
      } else {
        showingMessage("Activate failed", "Sign up with another email")
      }
    }
  }
  async submitLogin (values) {
    const { email, password } = values
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
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={Values => this.submitLogin(Values)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                  touched
                }) => (
                  <>
                    <InputText
                      label='Email'
                      placeholder='Write your email'
                      autoCompleteType='email'
                      keyboardType='email-address'
                      textContentType='emailAddress'
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    {errors.email && touched.email
                      ? <TextError>{errors.email}</TextError>
                      : null}
                    <PasswordInput
                      label='Password'
                      placeholder='Write your Password'
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    {errors.password && touched.password
                      ? <TextError>{errors.password}</TextError>
                      : null}
                    <ButtonSign
                      onPress={handleSubmit}
                      disabled={!isValid}
                      color={!isValid || values.email === '' || values.password === '' ? '#D8CCFA' : null}
                    >Sign In</ButtonSign>
                  </>
                )}
              </Formik>
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

const TextError = styled.Text`
  font-family: Mulish-Medium
  font-size: 12px
  color: red
`
const ButtonSign = styled(Button)`
  margin-top: 40px 

`
const mapStateToPros = state => ({
  auth: state.auth
})

const mapDispatchToProps = { login }
export default connect(mapStateToPros, mapDispatchToProps)(SignIn)
