import React from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native'
import { UpComingCard } from '../component/Card'
import Button from '../component/Button'
import { MonthUpComing } from '../helper/date'
function NowShowing () {
  return (
    <Row>
      <RowText>
        <View>
          <Text>Upcoming Movies</Text>
        </View>
        <TouchableOpacity>
          <View>
            <TextViewAll>View All</TextViewAll>
          </View>
        </TouchableOpacity>
      </RowText>
      <ContainerCard horizontal={true}>
        {MonthUpComing(6).map(item => {
          return (
            <ButtonMonth
              key={String(item)}
              radius={'4px'}
              fontSize={'16px'}
              height={'42px'}
              width={'100px'}
            >{item}</ButtonMonth>
          )
        })}
        <PaddingRight />
      </ContainerCard>
      <ContainerCard horizontal={true}>
        <UpComingCard />
        <UpComingCard />
        <UpComingCard />
        <PaddingRight />
      </ContainerCard>
    </Row>
  )
}

const Row = styled.View`
  padding-vertical: 30px
`
const RowText = styled.View`
  padding-horizontal: 30px
  margin-bottom: 30px
  justify-content: space-between
  flex-direction: row
`
const Text = styled.Text`
  font-size: 18px
  font-family: Mulish-Bold
  color: #14142B
`
const TextViewAll = styled(Text)`
  font-size: 14px
  font-family: Mulish-Medium
  color: #5F2EEA
`
const ContainerCard = styled.ScrollView`
  padding-horizontal: 30px
`
const PaddingRight = styled.View`
  width: 50px
`
const ButtonMonth = styled(Button)`
  margin-right: 5px
  margin-Bottom: 10px
`

export default NowShowing
