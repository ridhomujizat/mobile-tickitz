import React, { Component } from 'react'
import styled from 'styled-components/native'
import { LogoPurple } from '../component/Logo'
import { InputText, InputPassword } from '../component/Form'
import Button from '../component/Button'
import { showingMessage } from '../helper/flashMessage'
import { TouchableOpacity, View } from 'react-native'
import DimmedLoading from '../component/LoadingScreen/whiteLoading'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import { register, cleanMessage } from '../redux/actions/auth'


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required'),
  password: Yup.string()
    .min(8, '*Password must have at least 8 characters')
    .required('Password is required')
})
class SignUp extends Component {
  state = {
    isLoading: false
  }
  async singUpSubmit (values) {
    this.setState({ loaading: true })
    await this.props.register(values.email, values.password)

    if (this.props.auth.message) {
      await showingMessage("Register Success", this.props.auth.message, 'success')
      this.setState({ loaading: false })
    }

    if (this.props.auth.errorMsg) {
      await showingMessage("Register Failed", this.props.auth.errorMsg)
      this.setState({ loaading: false })
    }
  }
  render () {
    return (
      <>
        <ContainerPage>
          <LogoPurple width={'80px'} height={'40px'} disabled />
          <TitleLarge>Sign Up</TitleLarge>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={Values => this.singUpSubmit(Values)}
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
          <SignUpRow >
            <View>
              <SignUpQue>Do you already have an account?</SignUpQue>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
              <SignUpText> Log in</SignUpText>
            </TouchableOpacity>
          </SignUpRow>
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
const TextError = styled.Text`
  font-family: Mulish-Medium
  font-size: 12px
  color: red
`
const ButtonSign = styled(Button)`
  margin-top: 40px 

`
const Loading = styled.View`
  align-items: center
  margin-top: 40px
`

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = { register, cleanMessage }

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
