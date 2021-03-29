import React, { Component } from 'react'
import styled from 'styled-components/native'
import Button from '../component/Button'
import { InputText, InputPhoneNumber } from '../component/Form'
import warning from '../assets/images/logo/warning.png'
import gpay from '../assets/images/peyment-method/g-pay.png'
import dana from '../assets/images/peyment-method/dana.png'
import bca from '../assets/images/peyment-method/bca.png'
import bri from '../assets/images/peyment-method/bri.png'
import gopay from '../assets/images/peyment-method/gopay.png'
import ovo from '../assets/images/peyment-method/ovo.png'
import visa from '../assets/images/peyment-method/visa.png'
import paypal from '../assets/images/peyment-method/paypal.png'
import { TouchableOpacity, View } from 'react-native'
import Footer from '../component/Footer'
import http from '../helper/http'
import Loading from '../component/LoadingScreen'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { showingMessage } from '../helper/flashMessage'
import PushNotification from 'react-native-push-notification'
import { connect } from 'react-redux'
import { updateTransaction } from '../redux/actions/order'

const PaymentMethod = [gpay, dana, bca, bri, gopay, ovo, visa, paypal]
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

class Payment extends Component {
  state = {
    order: { total: 0 },
    profile: {
      name: null,
      phone: null,
      email: null
    },
    isLoading: true
  }
  onChange (key, value) {
    this.setState({
      profile:
      {
        ...this.state.profile,
        [key]: value
      }
    })
  }

  componentDidMount () {
    const { id } = this.props.route.params
    const { token } = this.props.auth
    const fetchData = async () => {
      const order = await http(token).get(`/transaction/${id}`)
      try {
        const profile = await http(token).get('/profile')
        this.setState({
          profile: {
            ...profile.data.results,
            name: `${profile.data.results.firstName} ${profile.data.results.lastName}`
          }
        })
      } catch (err) {
        this.setState({
          profile: this.state.profile
        })
      }
      if (order.data.results.status === 'success') {
        this.props.navigation.navigate('Profile')
      }
      await this.setState({
        order: order.data.results,

      })
      this.setState({ isLoading: false })
    }
    fetchData()
  }
  checkoutSlected = async (value) => {
    const { id } = this.props.route.params
    const { token } = this.props.auth
    const data = this.state.profile
    this.setState({ isLoading: true })
    await this.props.updateTransaction(token, id, value)
    await this.orderResult()

  }
  orderResult = () => {
    if (this.props.order.status === 'success') {
      showingMessage('Payment Success', 'Thank you, your payment success', 'success')
      this.setState({ isLoading: !this.state.isLoading })
      PushNotification.localNotification({
        channelId: 'ticket',
        title: 'Payment successfully',
        message: 'Enjoy the movie'
      })
      this.props.navigation.navigate('Ticket', { id: this.props.order.idTransaction })
    } else {
      this.setState({ isLoading: !this.state.isLoading })
      showingMessage('Payment Failed', this.props.order.erroMsg)
    }
  }
  render () {
    const { auth } = this.props
    return (
      <>
        <Loading isLoading={this.state.isLoading} />
        <Container showsVerticalScrollIndicator={false}>
          <Wrapper space='20px'>
            <RowSpaceBetween >
              <TotalLabel>Total Payment</TotalLabel>
              <Text>{this.state.order.total}</Text>
            </RowSpaceBetween>
          </Wrapper>
          <ContainerWrapper>
            <Label>Payment Method</Label>
            <Wrapper radius='16px' space='20px'>
              <PaymentWrapper>
                {PaymentMethod.map(item => {
                  return (
                    <PaymentSelect key={item}>
                      <Image source={item} />
                    </PaymentSelect>

                  )
                })}
              </PaymentWrapper>
              <HrWrape>
                <Hr />
                <OrText>Or</OrText>
                <Hr />
              </HrWrape>
              <HrWrape>
                <View>
                  <OrText>Pay via cash</OrText>
                </View>
                <TouchableOpacity>
                  <ManulPayment>See how it work</ManulPayment>
                </TouchableOpacity>
              </HrWrape>

            </Wrapper>
          </ContainerWrapper>
          <Formik
            initialValues={{
              name: auth.name !== 'Tickitzer' ? `${auth.name} ${auth.lastName}` : '',
              email: auth.email,
              phone: auth.phone ? auth.phone : ''
            }}
            validationSchema={validationSchema}
            onSubmit={values => this.checkoutSlected(values)}
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
              <>
                <ContainerWrapper>
                  <Label>Personal Info</Label>
                  <Wrapper radius='16px' space='20px'>
                    <InputTextStyle
                      label='Full Name'
                      placeholder='Write Your Full Name'
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                    />
                    {errors.name && touched.name
                      ? <TextError>{errors.name}</TextError>
                      : null}
                    <InputTextStyle
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
                    <InputPhoneStyle
                      label='Phone Number'
                      placeholder='Write Your Number'
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                    />
                    {errors.phone
                      ? <TextError>{errors.phone}</TextError>
                      : null}
                    <WarningWrapper>
                      <WarningIcon source={warning} />
                      <WarningText>Fill your data correctly.</WarningText>
                    </WarningWrapper>
                  </Wrapper>
                </ContainerWrapper>
                <ContainerWrapper>
                  <ButtonCheckout
                    onPress={() => this.checkoutSlected()}
                    height={'40px'}
                    radius={'5px '}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    color={!isValid || values.name === '' || values.phone === '' ? '#D8CCFA' : null}
                  >Checkout</ButtonCheckout>
                </ContainerWrapper>
              </>
            )}
          </Formik>
          <Footer />
        </Container>
      </>
    )
  }
}

const Container = styled.ScrollView`
  background-color: #F5F6F8
`
const ContainerWrapper = styled.View`
  padding: 20px
`
const Wrapper = styled.View`
  background-color: #fff
  border-radius: ${props => props.radius || 0}
  padding: ${props => props.space || 0}
  margin-bottom: ${props => props.marginB || 0}
`
const RowSpaceBetween = styled.View`
  flex-direction: row
  justify-content: space-between
`
const TotalLabel = styled.Text`
  font-family: Muslih-Medium
  font-size: 16px
  color: #AAAAAA
`
const Text = styled.Text`
  font-family: Muslih-SemiBold
  font-size: 20px
  color: #14142B
`
const Label = styled(Text)`
  margin-bottom: 10px
`
const ButtonCheckout = styled(Button)`
  margin-bottom: 20px
`
const InputTextStyle = styled(InputText)`
  margin-bottom: 10px
`

const InputPhoneStyle = styled(InputPhoneNumber)`
  margin-bottom: 10px
`
const WarningWrapper = styled.View`
  background-color: rgba(244, 183, 64, 0.3)
  padding: 15px 24px
  border-radius: 16px
  margin-top: 10px
  flex-direction: row
  align-items: center
`
const WarningIcon = styled.Image`
  width: 25px
  height: 25px
  margin-right: 20px
`
const WarningText = styled.Text`
  font-family: Muslih-Medium
  font-size: 14px
  color: #4E4B66
`
const PaymentWrapper = styled.View`
  justify-content: center
  flex-wrap: wrap
  flex-direction: row
`
const PaymentSelect = styled.TouchableOpacity`
  width: 70px
  height: 40px
  border: 1px #AAAA
  border-radius: 5px
  justify-content: center
  align-items: center
  margin-bottom: 10px
  margin-horizontal: 5px
`
const Image = styled.Image`
  resizeMode: contain
  height: 25px
  width: 50px
`

const Hr = styled.View`
  border: 0.5px #AAAA
  height: 0.5px
  width: 40%
`
const HrWrape = styled.View`
  flex-direction: row
  align-items: center
  width: 90%
  justify-content: center
  margin-vertical: 20px
`
const OrText = styled.Text`
  font-size: 14px
  margin-horizontal: 10px
  font-family: Mulish-Medium
`
const ManulPayment = styled(OrText)`
  color: #5F2EEA
`
const TextError = styled.Text`
  font-family: Mulish-Medium
  font-size: 12px
  color: red
`
const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order
})
const mapDispatchToProps = { updateTransaction }
export default connect(mapStateToProps, mapDispatchToProps)(Payment)
