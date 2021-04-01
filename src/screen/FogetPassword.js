import React, { Component } from 'react'
import styled from 'styled-components/native'
import { LogoPurple } from '../component/Logo'
import { InputText } from '../component/Form'
import Button from '../component/Button'
import { showingMessage } from '../helper/flashMessage'
import * as Yup from 'yup'
import { Formik } from 'formik'
import DimmedLoading from '../component/LoadingScreen/whiteLoading'
import { connect } from 'react-redux'
import { forgetPass, cleanMessage } from '../redux/actions/auth'
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required')
})
class ForgetPassword extends Component {
  state = {
    isLoading: false
  }
  async forgetPassword (values) {
    this.setState({ isLoading: true })
    await this.props.forgetPass(values.email)
    if (this.props.auth.message) {
      await showingMessage("Send Email Success", this.props.auth.message, 'success')
      this.setState({ isLoading: false })
      return this.props.cleanMessage()
    }

    if (this.props.auth.errorMsg) {
      await showingMessage("Send Email Failed", this.props.auth.errorMsg)
      this.setState({ isLoading: false })
      return this.props.cleanMessage()
    }
  }
  render () {
    return (
      <>
        <ContainerPage>
          <LogoPurple width={'80px'} height={'40px'} disabled />
          <TitleLarge>Forgot Password</TitleLarge>
          <TextContent>we&apos;ll send a link to your email shortly</TextContent>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={Values => this.forgetPassword(Values)}
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
                <ButtonActivate
                  onPress={handleSubmit}
                  disabled={!isValid}
                  color={!isValid || values.email === '' || values.password === '' ? '#D8CCFA' : null}
                >Activate</ButtonActivate>
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

const mapDispatchToProps = { forgetPass, cleanMessage }
export default connect(mapStateToPros, mapDispatchToProps)(ForgetPassword)
