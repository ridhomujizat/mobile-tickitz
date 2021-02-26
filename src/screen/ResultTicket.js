import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import barcode from '../assets/images/barcode.png'
function ResultTicket (props) {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <Card>
        <BarcodeWrapper>
          <Barcode source={barcode} />
        </BarcodeWrapper>

        <View>
          <Rounded />
          <RoundedLeft />
        </View>
        <WrapperTicketInfo>
          <FlexRow>
            <InfoWrapper>
              <Label>Movie</Label>
              <Text>Spider-Man: Homecoming</Text>
            </InfoWrapper>
            <InfoWrapper>
              <Label>Category</Label>
              <Text>PG-13</Text>
            </InfoWrapper>
          </FlexRow>
          <FlexRow>
            <InfoWrapper>
              <Label>Date</Label>
              <Text>07 Jul</Text>
            </InfoWrapper>
            <InfoWrapper>
              <Label>Time</Label>
              <Text>2:00pm</Text>
            </InfoWrapper>
          </FlexRow>
          <FlexRow>
            <InfoWrapper>
              <Label>Count</Label>
              <Text>3 pcs</Text>
            </InfoWrapper>
            <InfoWrapper>
              <Label>Seats</Label>
              <Text>C4, C5, C6</Text>
            </InfoWrapper>
          </FlexRow>
          <FlexRowTotal>
            <Text>Total</Text>
            <Text>$30.00</Text>
          </FlexRowTotal>
        </WrapperTicketInfo>
      </Card>
    </Container>
  )
}

const Container = styled.ScrollView`
  padding-horizontal: 30px
  padding-vertical: 40px
  background-color: #5F2EEA
`
const Card = styled.View`
  background-color: #fff
  border-radius: 16px
  position: relative
`
const BarcodeWrapper = styled.View`
  height: 250px
  width: 100%
  padding: 20px
  align-items: center
  justify-content: center
  border-bottom-width: 1px
  border-color: #DEDEDE
  borderStyle: dashed
  border-radius: 1px
`
const Barcode = styled.Image`
  height: 170px
  width: 170px
`
const Rounded = styled.View`
  width: 50px
  height: 50px
  border-radius: 50px
  background-color:  #5F2EEA
  position: absolute
  right: -30px
  bottom: -20px
`
const RoundedLeft = styled.View`
  width: 50px
  height: 50px
  border-radius: 50px
  background-color:  #5F2EEA
  position: absolute
  left: -30px
  bottom: -20px
`
const WrapperTicketInfo = styled.View`
  margin-vertical: 20px
  padding: 30px
`

const FlexRow = styled.View`
  flex-direction: row
  justify-content: space-between
  width: 100%
  margin-bottom: 20px
`
const FlexRowTotal = styled(FlexRow)`
  margin-bottom: 0px
  border-radius: 8px
  border: 0.5px #DEDEDE
  padding: 15px
`
const InfoWrapper = styled.View`
  margin-right: 10px
  width: 120px
`
const Label = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 12px
  color: #AAAA
`
const Text = styled.Text`
font-family: Mulish-SemiBold
font-size: 12px
color: #14142B
`
export default ResultTicket
