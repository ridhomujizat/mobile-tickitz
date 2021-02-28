import React, { Component } from 'react'
import styled from 'styled-components/native'
import dot from '../assets/images/logo/dot.png'
import user from '../assets/images/user.jpeg'
import { TouchableOpacity, View } from 'react-native'
import { InputPassword, InputText, InputPhoneNumber } from '../component/Form'
import Button from '../component/Button'
import Footer from '../component/Footer'
import Loading from '../component/LoadingScreen/whiteLoading'
import { showingMessage } from "../helper/flashMessage";
import { Formik } from 'formik'
import * as Yup from 'yup'
import { API_URL } from '@env'
import { connect } from 'react-redux'
import { updateProfile } from '../redux/actions/profile'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, '*First Names must have at least 2 characters')
    .max(50, '*First name must be less than 50 characters')
    .required('*First name is required'),
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 100 characters')
    .required('*Email is required'),
  phone: Yup.string()
    .min(9, '*Phone number must have at least 9 characters')
    .max(15, '*Phone number cant be longer than 10 characters')
    .required('*Phone Number is required')
})
class UpdateProfile extends Component {
  state = {
    isLoading: false
  }
  updateProfile = async (values, form) => {
    const { token } = this.props.auth
    console.log(values)
    this.setState({ isLoading: true })
    try {
      await this.props.updateProfile(token, values)
      await this.setState({ isLoading: false })
      showingMessage(`${form} Update success`, '', 'success')
    } catch (err) {
      await this.setState({ isLoading: false })
      console.log(err)
      showingMessage(`${form} failed to update`, this.props.auth.errorMsg,)
    }
  }
  updateData = async () => {
    const { token } = this.props.auth
    const { image, ...data } = this.state.profile
    console.log(data)
    console.log(token)
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

  render () {
    const { auth } = this.props
    return (
      <>
        <Loading isLoading={this.state.isLoading} />
        <Container>
          <Row>
            <Card>
              <FlexRow>
                <Title>Info</Title>
                <TouchableOpacity>
                  <Icon source={dot} />
                </TouchableOpacity>
              </FlexRow>
              <TouchableOpacity>
                <ProfilePicture source={{ uri: `${API_URL}${auth.image}` }} />
              </TouchableOpacity>
              <NameText>{`${auth.name} ${auth.lastName}`}</NameText>
              <UserRank>Moviegoers</UserRank>
              <Line />
              <Title>Loyalty Points</Title>

              <TitleCenter>180 points become a master</TitleCenter>
              <ProgressPoint>
                <ProgressStatus status={'50%'} />
              </ProgressPoint>
            </Card>
            <Label>Account Settings</Label>
            <Card>
              <Title>Details Information</Title>
              <LineSort />
              <Formik
                initialValues={{
                  name: `${auth.name} ${auth.lastName}`,
                  email: auth.email,
                  phone: auth.phone
                }}
                validationSchema={validationSchema}
                onSubmit={values => this.updateProfile(values, 'Profile')}
              >
                {(
                  {
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    touched
                  }) => (
                  <View>
                    <FormText
                      label='Full Name'
                      placeholder='Write Your Full Name'
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                    />
                    {errors.name && touched.name
                      ? <TextError>{errors.name}</TextError>
                      : null}
                    <FormText
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
                    <FormPhoneNumber
                      label='Phone Number'
                      placeholder='Write Your Number'
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                    />
                    {errors.phone
                      ? <TextError>{errors.phone}</TextError>
                      : null}
                    <Button
                      height='45px'
                      radius='8px'
                      onPress={handleSubmit}
                      disabled={!isValid}
                      color={!isValid ? '#D8CCFA' : null}
                    > Update Changes </Button>
                  </View>
                )}
              </Formik>
            </Card>
            <Card>
              <Title>Change Password</Title>
              <LineSort />
              <Formik
                initialValues={{
                  password: '',
                  validPassword: ''
                }}
                validate={(values) => this.passwordValidation(values)}
                onSubmit={(values, { resetForm }) => {
                  this.updateProfile(values, 'Password')
                  resetForm()
                }
                }>
                {(
                  {
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    touched
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
                    <Button
                      height='45px'
                      radius='8px'
                      onPress={handleSubmit}
                      disabled={values.password === '' || values.validPassword === '' || errors.msg}
                      color={values.password === '' || values.validPassword === '' || errors.msg ? '#D8CCFA' : null}
                    >
                      Change password
                  </Button>
                  </>
                )}
              </Formik>
            </Card>
          </Row>
          <Footer />
        </Container>
      </>
    )
  }
}

const Container = styled.ScrollView`
  background-color: #D6D8E7
`
const Row = styled.View`
  padding: 30px
`
const Card = styled.View`
  padding: 25px
  border-radius: 16px
  width: 100%
  background-color: #fff
  margin-bottom: 20px
`
const FlexRow = styled.View`
  flex-direction: row
  justify-content: space-between
  margin-top: 20px
  margin-bottom: 30px
`
const Title = styled.Text`
  font-family: Mulish-Medium
  font-size: 16px
  color: #4E4B66
`
const TitleCenter = styled(Title)`
  text-align: center
`
const Icon = styled.Image`
  height: 26px
  width: 26px
`
const ProfilePicture = styled.Image`
  height: 140px
  width: 140px
  border-radius: 100px
  justify-content: center
  margin: auto
`
const NameText = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 20px
  margin-top: 20px
  margin-bottom: 5px
  text-align: center
`
const UserRank = styled.Text`
  font-family: Mulish-Medium
  font-size: 12px
  color: #4E4B66
  text-align: center
`
const Line = styled.View`
  width: 100%
  height: 1px
  border: 0.5px #DEDEDE
  margin-vertical: 40px
`
const LineSort = styled(Line)`
  margin-top: 10px
  margin-bottom: 20px
`
const ProgressPoint = styled.View`
  width: 100%
  border-radius: 50px
  height: 15px
  margin-top: 15px
  margin-bottom: 50px
  background-color: #DEDEDE
`
const ProgressStatus = styled.View`
  width: ${props => props.status}
  height: 100%
  border-radius: 50px
  background-color: #5F2EEA
`
const Label = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 18px
  color: #14142B
  margin-vertical: 10px
`
const FormText = styled(InputText)`
  margin-vertical: 10px
`
const FormPhoneNumber = styled(InputPhoneNumber)`
  margin-vertical: 10px
`
const FormPassword = styled(InputPassword)`
  margin-vertical: 10px
`
const TextError = styled.Text`
  font-family: Mulish-Medium
  font-size: 12px
  color: red
`
const mapStateToProps = (state) => ({
  auth: state.auth
})
const mapDispatchToProps = { updateProfile }
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
