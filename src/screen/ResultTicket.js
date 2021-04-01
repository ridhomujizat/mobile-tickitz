import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import barcode from '../assets/images/barcode.png'
import { parsingDM } from '../helper/date'
import { connect } from 'react-redux'
import http from '../helper/http'
import Loading from '../component/LoadingScreen'
import rupiah from '../helper/rupiah'
import { useNavigation } from '@react-navigation/native'

function ResultTicket (props) {
  const [ticket, setTicket] = useState({
    time: '',
    title: '',
    seatSelected: '',
    total: '',
    date: new Date(),
    total: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { id } = props.route.params
    const { token } = props.auth
    async function fetchData () {
      const resoponse = await http(token).get(`transaction/${id}`)
      await setTicket(resoponse.data.results)
      await setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <>
      <Loading isLoading={isLoading} />
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
                <Text>{ticket.title}</Text>
              </InfoWrapper>
            </FlexRow>
            <FlexRow>
              <InfoWrapper>
                <Label>Date</Label>
                <Text>{parsingDM(ticket.date)}</Text>
              </InfoWrapper>
              <InfoWrapper>
                <Label>Time</Label>
                <Text>{ticket.time.slice(0, 5)}</Text>
              </InfoWrapper>
            </FlexRow>
            <FlexRow>
              <InfoWrapper>
                <Label>Count</Label>
                <Text>{ticket.seatSelected.split(',').length} pcs</Text>
              </InfoWrapper>
              <InfoWrapper>
                <Label>Seats</Label>
                <Text>{ticket.seatSelected}</Text>
              </InfoWrapper>
            </FlexRow>
            <FlexRowTotal>
              <Text>Total</Text>
              <Text>Rp {rupiah(ticket.total)}</Text>
            </FlexRowTotal>
          </WrapperTicketInfo>
        </Card>
      </Container>
    </>
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
const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(ResultTicket)
