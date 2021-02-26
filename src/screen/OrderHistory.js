import React from 'react'
import styled from 'styled-components'
import Cinema from '../assets/images/cinemas/ebv.id.png'
import Button from '../component/Button'

function OrderHistor (props) {
  return (
    <Container>
      <Row>
        <Card>
          <ImageCinema source={Cinema} />
          <DateText>Tuesday, 07 July 2020 - 04:30pm</DateText>
          <Title>Spider-Man: Homecoming</Title>
          <Line />
          <Button
            height='40px'
            radius='8px'
            color='#00BA88'
          >
            Ticket in active
          </Button>
        </Card>
      </Row>
    </Container>
  )
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
const ImageCinema = styled.Image`
  width: 100px
  height: 40px
  resizeMode: contain
`
const DateText = styled.Text`
  font-family: Mulish-Medium
  font-size: 13px
  color: #AAAA
  margin-vertical: 10px
`
const Title = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 18px
`
const Line = styled.View`
  width: 100%
  height: 1px
  border: 0.5px #DEDEDE
  margin-vertical: 20px
`
export default OrderHistor
