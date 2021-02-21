import React, { Component } from 'react'
import styled from 'styled-components/native'
import { type1 } from '../helper/seatType'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

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
    console.log(selectedSeat)
  }
  render () {
    return (
      <Container>
        <Label>Choose your seat</Label>
        <Wrapper>
          <View>
            <ScreenIndicator />
            <SeatWrapper>
              <SeatRowIndicator />
              <View>
                {type1.map((row, index) => {
                  return (
                    <ColSeat key={String(index)}>
                      {row.map((seatItem) => {

                        return (
                          seatItem.class === 'space'
                            ? <Space key={String(seatItem.id)} />
                            : this.state.selectedSeat.indexOf(seatItem.id) > -1
                              ? (<TouchableOpacity
                                key={String(seatItem.id)}
                                style={[
                                  seatItem.class === 'loveNest'
                                    ? style.loveNest
                                    : style.seat,
                                  this.state.sold.indexOf(seatItem.id) > -1
                                    ? style.sold
                                    : null,
                                  style.selected

                                ]}
                                disabled={this.state.sold.indexOf(seatItem.id) > -1}
                                onPress={(id) => this.selectedSeat(seatItem.id)}
                              />)
                              : (
                                <TouchableOpacity
                                  key={String(seatItem.id)}
                                  style={[
                                    seatItem.class === 'loveNest'
                                      ? style.loveNest
                                      : style.seat,
                                    this.state.sold.indexOf(seatItem.id) > -1
                                      ? style.sold
                                      : null,

                                  ]}
                                  disabled={this.state.sold.indexOf(seatItem.id) > -1}
                                  onPress={(id) => this.selectedSeat(seatItem.id)}
                                />
                              )
                        )
                      })}
                    </ColSeat>
                  )
                })}
              </View>
            </SeatWrapper>
          </View>
        </Wrapper>
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
`
const Wrapper = styled.View`
  border-radius: 8px
  background-color: #fff
  padding: 10px
  align-items: center
`
const ScreenIndicator = styled.View`
  border-radius: 16px
  height: 5px
  background-color: #9570FE
  margin-top: 20px
`
const SeatWrapper = styled.View`
  flex-direction: row
  margin-top: 10px
`
const SeatRowIndicator = styled.View`
  width: 3px
  height: 96%
  background-color: #00BA88
  margin-right: 3px
`
const Space = styled.View`
  width: 20px
`
const ColSeat = styled.View`
  flex-direction: row
  margin-bottom: 5px
`
export default Order
