import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import cinema from '../../assets/images/cinemas/hiflix.png'
import Button from '../Button'
import { useNavigation } from '@react-navigation/native'
function Schedule (props) {
  const navigation = useNavigation()

  const submitSchedule = () => {
    navigation.navigate('Order')
  }
  return (
    <Wrapper style={props.style}>
      <Image source={cinema} />
      <Address>Whatever street No.12, South Purwokerto</Address>
      <Hr />
      <TimesWrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
          return (
            <TouchableOpacity key={String(item)}>
              <TimeCol >
                <Time>08.30</Time>
              </TimeCol>
            </TouchableOpacity>
          )
        })}
      </TimesWrapper>
      <ViewFlexRow>
        <PriceLabel>Price</PriceLabel>
        <Price>$10.00/seat</Price>
      </ViewFlexRow>
      <ViewFlexRow>
        <Button
          radius={'5px'}
          height={'40px'}
          onPress={submitSchedule}
        >Book Now</Button>
        <Button
          color={'transparent'}
          fontColor={'#5F2EEA'}
        >Add to cart</Button>
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
  margin: auto
  width: 150px
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
  margin-bottom: 10px
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
  margin-bottom: 20px
`

const Price = styled(PriceLabel)`
  font-family: Mulish-SemiBold
  font-size: 16px
`
export default Schedule
