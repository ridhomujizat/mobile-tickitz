import React from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native'
import { NowShowingCard } from '../component/Card'

function NowShowing () {
  return (
    <Row>
      <RowText>
        <View>
          <Text>Now Showing</Text>
        </View>
        <TouchableOpacity>
          <View>
            <TextViewAll>ViewAll</TextViewAll>
          </View>
        </TouchableOpacity>
      </RowText>
      <ContainerCard horizontal={true}>
        <NowShowingCard />
        <NowShowingCard />
        <NowShowingCard />
        <PaddingRight />
      </ContainerCard>
    </Row>
  )
}

const Row = styled.View`
  padding-vertical: 30px
  background-color : #D6D8E7
`
const RowText = styled.View`
  padding-horizontal: 30px
  margin-bottom: 30px
  justify-content: space-between
  flex-direction: row
`
const Text = styled.Text`
  font-size: 18px
  color: #5F2EEA
  font-family: Mulish-Bold
`
const TextViewAll = styled(Text)`
  font-size: 14px
  font-family: Mulish-Medium
`
const ContainerCard = styled.ScrollView`
  padding-horizontal: 30px
`
const PaddingRight = styled.View`
  width: 50px
`

export default NowShowing
