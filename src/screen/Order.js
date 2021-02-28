import React, { Component } from 'react'
import styled from 'styled-components/native'
import { type1 } from '../helper/seatType'
import { View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native'
import Button from '../component/Button'
import Right from '../assets/images/logo/right-row.png'
import Bottom from '../assets/images/logo/froward-row.png'
import Footer from '../component/Footer'
import Loading from '../component/LoadingScreen/whiteLoading'
import { parsingDM } from '../helper/date'
import { showingMessage } from '../helper/flashMessage'

import { connect } from 'react-redux'
import http from '../helper/http'
import { removeSeat, selectSeat, createTransaction } from '../redux/actions/order'
class Order extends Component {
  state = {
    sold: [],
    selectedSeat: [],
    modal: false,
    isLoading: false,
    idSchedule: this.props.order.idSchedule
  }

  componentDidMount () {
    const { idSchedule } = this.props.order
    const { sold } = this.state
    const checkSoldDate = async () => {
      const response = await http().get(`/transaction/seat/${idSchedule}`)
      this.setState({ sold: response.data.result })

    }
    checkSoldDate()
  }

  selectedSeat (id) {
    const seat = id
    const { seatSelected } = this.props.order;
    if (seatSelected.indexOf(id) > -1) {
      // this.setState({ selectedSeat: selectedSeat.filter(item => item !== id) })
      return this.props.removeSeat({ seat })
    }
    // this.setState({ selectedSeat: [...selectedSeat, ...[id]] })
    return this.props.selectSeat({ seat })
  }

  checkout = async () => {
    const data = this.props.order
    const { token } = this.props.auth
    this.setState({ isLoading: true })
    this.showModal()
    await this.props.createTransaction(token, data)
    await this.orderResult()
  }
  orderResult = () => {
    if (this.props.order.idTransaction) {
      showingMessage('Order Success', 'Please complate yout payment', 'success')
      this.setState({ isLoading: false })
      this.props.navigation.navigate('Payment', { id: this.props.order.idTransaction })
    } else {
      this.setState({ isLoading: false })
      showingMessage('Order Failed', this.props.order.erroMsg)
    }
  }
  showModal () {
    this.setState({ modal: !this.state.modal })
    // this.props.navigation.navigate('Payment')
  }

  render () {
    return (
      <>
        <Loading isLoading={this.state.isLoading} colorLoading={'#fff'} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal}
        >
          <ModalView style={{ backgorunColor: '#000', border: 6 }}>
            <ConfirmationWrapper>
              <ScrollView>
                <OrderInfo>
                  <Label>Your Order</Label>
                  <Cinema>{this.props.order.cinemaName}</Cinema>
                  <RowWrapperFluid>
                    <LabelConfim>{parsingDM(this.props.order.date)}</LabelConfim>
                    <ChoosedTextWrapper>
                      <OrderText>{this.props.order.time.slice(0, 5)}</OrderText>
                    </ChoosedTextWrapper>
                  </RowWrapperFluid>
                  <RowWrapperFluid>
                    <LabelConfim>One ticket price</LabelConfim>
                    <ChoosedTextWrapper>
                      <OrderText>{this.props.order.price}</OrderText>
                    </ChoosedTextWrapper>
                  </RowWrapperFluid>
                  <RowWrapperFluid>
                    <LabelConfim>Choosed</LabelConfim>
                    <ChoosedTextWrapper>
                      <OrderText>{this.props.order.seatSelected.join(', ')}</OrderText>
                    </ChoosedTextWrapper>
                  </RowWrapperFluid>
                  <RowWrapperFluid>
                    <Label>Total</Label>
                    <ChoosedTextWrapper>
                      <ChoosedText>{this.props.order.total}</ChoosedText>
                    </ChoosedTextWrapper>
                  </RowWrapperFluid>
                </OrderInfo>
                <ButtonConfim
                  height='40px'
                  radius='8px'
                  onPress={() => this.checkout()}
                >Confirm Checkout</ButtonConfim>
                <ButtonCancel
                  height='30px'
                  color='white'
                  radius='8px'
                  fontColor='#DEDEDE'
                  onPress={() => this.showModal()}
                >Cancel</ButtonCancel>
              </ScrollView>

            </ConfirmationWrapper>
          </ModalView>
        </Modal>
        <Row showsVerticalScrollIndicator={false}>
          <Container>
            <Label>Choose your seat</Label>
            <Wrapper>
              <View>
                <ScreenIndicator />
                <RowWrapper>
                  <SeatRowIndicator />
                  <View>
                    {type1.map((row, index) => {
                      return (
                        <ColSeat key={String(index)}>
                          {row.map((seatItem) => {
                            if (seatItem.class === 'space') {
                              return (
                                <Space key={String(seatItem.id)} />
                              )
                            } else {
                              return (<TouchableOpacity
                                key={String(seatItem.id)}
                                style={[
                                  seatItem.class === 'loveNest'
                                    ? style.loveNest
                                    : style.seat,
                                  this.state.sold.indexOf(seatItem.id) > -1
                                    ? style.sold
                                    : null,
                                  this.props.order.seatSelected.indexOf(seatItem.id) > -1
                                    ? style.selected
                                    : null
                                ]}
                                disabled={this.state.sold.indexOf(seatItem.id) > -1}
                                onPress={(id) => this.selectedSeat(seatItem.id)}
                              />

                              )
                            }

                          })}
                        </ColSeat>
                      )
                    })}
                  </View>
                </RowWrapper>
                <SeatKeyColWrapper>
                  <SeatColIndicator />
                  <Space />
                  <SeatColIndicator />
                </SeatKeyColWrapper>
                <Label>Seating Key</Label>
                <RowWrapper>
                  <SeatingKeyWrapper>
                    <ArrowImage source={Bottom} />
                    <TextKey>A - B</TextKey>
                  </SeatingKeyWrapper>
                  <SeatingKeyWrapper>
                    <ArrowImage source={Right} />
                    <TextKey>1 - 14</TextKey>
                  </SeatingKeyWrapper>
                </RowWrapper>
                <RowWrapper>
                  <SeatingKeyWrapper>
                    <Seat />
                    <TextKey>Available</TextKey>
                  </SeatingKeyWrapper>
                  <SeatingKeyWrapper>
                    <SelectedSeat />
                    <TextKey>Selected</TextKey>
                  </SeatingKeyWrapper>
                </RowWrapper>
                <RowWrapper>
                  <SeatingKeyWrapper>
                    <LoveNestedSeat />
                    <TextKey>Love Nest</TextKey>
                  </SeatingKeyWrapper>
                  <SeatingKeyWrapper>
                    <SoldSeat />
                    <TextKey>Sold</TextKey>
                  </SeatingKeyWrapper>
                </RowWrapper>
              </View>
            </Wrapper>
            <WrapperSecond>
              <RowWrapperFluid>
                <Label>Choosed</Label>
                <ChoosedTextWrapper>
                  <ChoosedText>{this.props.order.seatSelected.join(', ')}</ChoosedText>
                </ChoosedTextWrapper>
              </RowWrapperFluid>
            </WrapperSecond>
            <ButtonCheckout
              onPress={() => this.showModal()}
              height={'40px'}
              radius={'5px '}
            >Checkout</ButtonCheckout>
          </Container>

          <Footer />
        </Row>
      </>
    )
  }
}

const style = StyleSheet.create({
  seat: {
    borderRadius: 3,
    width: 15,
    height: 15,
    marginRight: 5,
    backgroundColor: '#D6D8E7'
  },
  selected: {
    backgroundColor: '#5F2EEA'
  },
  sold: {
    backgroundColor: '#6E7191'
  },
  loveNest: {
    borderRadius: 3,
    width: 35,
    height: 15,
    marginRight: 5,
    backgroundColor: '#F589D7'
  }
})


const Row = styled.ScrollView`
  background-color: #F5F6F8
`
const Container = styled.View`
  padding: 20px
`
const Label = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 18px
  margin-vertical: 10px
  margin-right: 20px
`
const LabelConfim = styled(Label)`
  color: #6B6B6B
  font-size: 14px
`
const OrderText = styled(Label)`
  font-size: 14px
  font-family: Mulish-Bold
  margin-right: 0
  text-align: right
`
const ChoosedText = styled(Label)`
  font-family: Mulish-Bold
  margin-right: 0
  text-align: right
`
const Cinema = styled(Label)`
  font-family: Mulish-Bold
  margin-right: 0
  text-align: center
`
const ChoosedTextWrapper = styled.View`
  width: 60%
`
const Wrapper = styled.View`
  border-radius: 8px
  background-color: #fff
  padding: 10px
  align-items: center
`
const WrapperSecond = styled(Wrapper)`
  margin-top: 20px
  align-items: flex-start
`
const ScreenIndicator = styled.View`
  border-radius: 16px
  height: 5px
  background-color: #9570FE
  margin-top: 20px
`

const RowWrapper = styled.View`
  flex-direction: row
  margin-top: 5px
`
const RowWrapperFluid = styled(RowWrapper)`
  width: 100%
  justify-content: space-between
  padding: 1px
`

const SeatKeyColWrapper = styled.View`
  flex-direction: row
`
const SeatRowIndicator = styled.View`
  width: 3px
  height: 96%
  background-color: #00BA88
  margin-right: 3px
  border-radius: 16px
  margin-top: 5px
`
const SeatColIndicator = styled(ScreenIndicator)`
  margin-left: 6px
  height: 3px
  margin-top: 3px
  width: 135px
  background-color : #ED2E7E
`
const Space = styled.View`
  width: 20px
`
const ColSeat = styled.View`
  flex-direction: row
  margin-top: 5px
`
const SeatingKeyWrapper = styled.View`
  width: 100px
  flex-direction: row
  align-items: center
  margin-right: 10px
  margin-bottom: 10px
`
const ArrowImage = styled.Image`
  width: 20px
  height: 20px
  margin-right: 10px
`
const TextKey = styled.Text`
  font-family: Mulish-Medium
  font-size: 14px
  color: #4E4B66
`
const Seat = styled.View`
  width: 20px
  height: 20px
  margin-right: 10px
  border-radius: 5px
  background-color: #D6D8E7
`
const SelectedSeat = styled(Seat)`
  background-color: #5F2EEA
`
const SoldSeat = styled(Seat)`
background-color: #6E7191
`
const LoveNestedSeat = styled(Seat)`
background-color: #F589D7
`
const ButtonCheckout = styled(Button)`
  margin-vertical: 20px
`
const ModalView = styled.View`
  flex: 1
  justify-content: flex-end
  align-items: center
  background-color: rgba(0,0,0,0.5)
`
const ConfirmationWrapper = styled.View`
  width: 100%
  background-color: #fff
  borderTopLeftRadius: 16px
  borderTopRightRadius: 16px
`

const OrderInfo = styled.View`
  padding: 30px
`
const ButtonConfim = styled(Button)`
  margin-horizontal: 20px
  margin-bottom: 10px
`
const ButtonCancel = styled(Button)`
  margin-bottom: 10px
  margin-horizontal: 30px
`

const mapStateToProps = (state) => ({
  order: state.order,
  auth: state.auth
})
const mapDispatchToProps = { selectSeat, removeSeat, createTransaction }


export default connect(mapStateToProps, mapDispatchToProps)(Order)
