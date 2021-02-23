import React, { Component } from 'react'
import styled from 'styled-components/native'
import { type1 } from '../helper/seatType'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Button from '../component/Button'
import Right from '../assets/images/logo/right-row.png'
import Bottom from '../assets/images/logo/froward-row.png'
import Footer from '../layouts/Footer'

class Order extends Component {
  state = {
    sold: ['G7', 'G6'],
    selectedSeat: ['A1']
  }
  selectedSeat (id) {
    const { selectedSeat } = this.state;
    if (this.state.selectedSeat.indexOf(id) > -1) {
      return this.setState({ selectedSeat: selectedSeat.filter(item => item !== id) })
    }
    this.setState({ selectedSeat: [...selectedSeat, ...[id]] })
  }
  checkoutSlected () {
    this.props.navigation.navigate('Payment')
  }

  render () {
    return (
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
                              this.state.selectedSeat.indexOf(seatItem.id) > -1
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
              <ChoosedText>{this.state.selectedSeat.join(', ')}</ChoosedText>
            </ChoosedTextWrapper>
          </RowWrapperFluid>
        </WrapperSecond>
        <ButtonCheckout
          onPress={() => this.checkoutSlected()}
          height={'40px'}
          radius={'5px '}
        >Checkout</ButtonCheckout>
      </Container>
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
const Container = styled.ScrollView`
  background-color: #F5F6F8
  padding: 20px
`
const Label = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 18px
  margin-vertical: 20px
  margin-right: 20px
`
const ChoosedText = styled(Label)`
  font-family: Mulish-Bold
  margin-right: 0
  text-align: right
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

export default Order
