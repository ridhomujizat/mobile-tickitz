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

const PaymentMethod = [gpay, dana, bca, bri, gopay, ovo, visa, paypal]

class Payment extends Component {
  checkoutSlected () {
    this.props.navigation.navigate('Ticket')
  }
  render () {
    return (
      <Container>
        <Wrapper space='20px'>
          <RowSpaceBetween >
            <TotalLabel>Total Payment</TotalLabel>
            <Text>$30.00</Text>
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
        <ContainerWrapper>
          <Label>Personal Info</Label>
          <Wrapper radius='16px' space='20px'>
            <InputTextStyle
              label='Full Name'
              placeholder='Write your name'
            />
            <InputTextStyle
              label='Email'
              placeholder='Write your email'
            />
            <InputPhoneStyle
              label='Phone Number'
              placeholder='Write your number'
            />
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
          >Checkout</ButtonCheckout>
        </ContainerWrapper>
      </Container>
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
export default Payment
