import React, { Component } from 'react'
import styled from 'styled-components/native'
import { LogoPurple } from '../component/Logo'
import { InputPassword } from '../component/Form'
import Button from '../component/Button'
import { showingMessage } from '../helper/flashMessage'
import { Formik } from 'formik'
import DimmedLoading from '../component/LoadingScreen/whiteLoading'
import { connect } from 'react-redux'
import { updateProfile } from '../redux/actions/profile'

class ChangePassword extends Component {
  state = {
    isLoading: false,
    token: null
  }

  componentDidMount () {
    const { token } = this.props.route.params
    if (token) {
      this.setState({ token })
    } else {
      return this.props.navigation.navigate('SignIn')
    }
  }

  passwordValidation (values) {
    const errors = {}
    const { password, validPassword } = values

    if (!password) {
      errors.msg = 'New Password Required'
    } else if (!validPassword) {
      errors.msg = 'Repeat your new password'
    } else if (password.length < 8 || validPassword.length < 8) {
      errors.msg = 'Password have at least 8 characters'
    } else if (password !== validPassword) {
      errors.msg = 'New password & repeat password not same'
    }
    return errors
  }

  updateProfile = async (values) => {
    const { token } = this.state
    this.setState({ isLoading: true })
    await this.props.updateProfile(token, values)
    await this.setState({ isLoading: false })
    if (this.props.auth.message) {
      showingMessage(`Password Updated`, 'You can sign in with new password', 'success')
      return this.props.navigation.navigate('SignIn')
    }
    if (this.props.auth.errorMsg) {
      return showingMessage(`Failed update password`, this.props.auth.errorMsg)
    }
  }
  render () {
    return (
      <>
        <ContainerPage>
          <LogoPurple width={'80px'} height={'40px'} disabled />
          <TitleLarge>Create New Password</TitleLarge>
          <Formik
            initialValues={{
              password: '',
              validPassword: ''
            }}
            validate={(values) => this.passwordValidation(values)}
            onSubmit={Values => this.updateProfile(Values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
            }) => (
              <>
                <FormPassword
                  label='New Password'
                  placeholder='Write your Password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <FormPassword
                  label='Confirm Password'
                  placeholder='Write your Password'
                  value={values.validPassword}
                  onChangeText={handleChange('validPassword')}
                  onBlur={handleBlur('validPassword')}
                />
                {errors.msg
                  ? <TextError>{errors.msg}</TextError>
                  : null}
                <ButtonActivate
                  onPress={handleSubmit}
                  disabled={values.password === '' || values.validPassword === '' || errors.msg}
                  color={values.password === '' || values.validPassword === '' || errors.msg ? '#D8CCFA' : null}
                >Submit</ButtonActivate>
              </>
            )}
          </Formik>
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
const TextError = styled.Text`
  font-family: Mulish-Medium
  font-size: 12px
  color: red
`
const ButtonActivate = styled(Button)`
  margin-top: 40px 
`
const mapStateToPros = state => ({
  auth: state.auth
})

const FormPassword = styled(InputPassword)`
  margin-vertical: 10px
`

const mapDispatchToProps = { updateProfile }
export default connect(mapStateToPros, mapDispatchToProps)(ChangePassword)
