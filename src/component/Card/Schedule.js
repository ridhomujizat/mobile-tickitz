import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import cinema from '../../assets/images/cinemas/hiflix.png'
import Button from '../Button'
import { useNavigation } from '@react-navigation/native'
import { API_URL } from '@env'
import { parsingDM } from '../../helper/date'

import { connect } from 'react-redux'
import { selectTime } from '../../redux/actions/order'

function Schedule (props) {
  const navigation = useNavigation()
  const selectDate = (value) => {
    console.log(value)
    return props.selectTime({
      idSchedule: value.id,
      time: value.time,
      seat: value.seat
    })
  }
  const bookNow = () => {
    props.selectTime({
      title: props.title,
      idMovie: props.idMovie,
      date: props.date,
      imageCinema: props.image,
      price: props.price,
      cinemaName: props.name
    })
    navigation.navigate('Order')
  }
  return (
    <Wrapper style={props.style}>
      <ViewFlexRow>
        <Image source={{ uri: `${API_URL}${props.image}` }} />
        <Label>{parsingDM(props.date)}</Label>
      </ViewFlexRow>
      <Address>{props.address}</Address>
      <Hr />
      <TimesWrapper>
        {props.showTime.map(item => {
          return (
            <TouchableOpacity onPress={() => selectDate(item)} key={String(item.id)} >
              <TimeCol id={item.id} seat={props.order.idSchedule}>
                <Time>{item.time.slice(0, 5)}</Time>
              </TimeCol>
            </TouchableOpacity>
          )
        })}
      </TimesWrapper>
      <ViewFlexRow>
        <PriceLabel>Price</PriceLabel>
        <Label>{props.price}</Label>
      </ViewFlexRow>
      <ViewFlexRow>
        <Button
          radius={'5px'}
          height={'40px'}
          onPress={bookNow}
          disabled={props.order.idSchedule === null}
          color={props.order.idSchedule === null && '#D8CCFA'}
        >Book Now</Button>
        {/* <Button
          color={'transparent'}
          fontColor={'#5F2EEA'}
        >Add to cart</Button> */}
      </ViewFlexRow>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  width: 100%
  padding: 20px
  border: 0.1px #DEDEDE solid
  background-color: #fff
  border-radius: 8px
  elevation: 1
  margin-bottom: 20px
`
const Image = styled.Image`
  width: 110px
  height: 50px
  resizeMode: contain
`
const Address = styled.Text`
  font-family: Mulish-medium
  font-size: 13px
  padding: 10px
  color: #AAAA
`
const Hr = styled.View`
  margin: auto
  border: 0.5px solid #DEDEDE
  height:1px
  margin-vertical: 30px
  width: 100%
  margin-top: 20px
  margin-bottom: 20px
`
const TimesWrapper = styled.View`
  flex-direction: row
  flex-wrap: wrap
`
const TimeCol = styled.View`
  width: 60px
  height: 30px
  justify-content: center
  ${props => props.seat === props.id && 'background-color: #DEDEDE'}
  border-radius: 8px
`
const Time = styled.Text`
  font-family: Mulish-Medium
  font-size: 14px
  color: #4E4B66
  text-align: center
`
const ViewFlexRow = styled.View`
  flex-direction: row
  justify-content: space-between
  align-items: center
`
const PriceLabel = styled.Text`

  font-family: Mulish-Medium
  font-size: 14px
  color: #4E4B66
  margin-vertical: 20px
`

const Label = styled(PriceLabel)`
  font-family: Mulish-SemiBold
  font-size: 16px
`
const mapStateToProps = (state) => ({
  order: state.order
})
const mapDispatchToProps = { selectTime }
export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
