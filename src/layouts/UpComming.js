import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native'
import { UpComingCard } from '../component/Card'
import Button from '../component/Button'
import { MonthUpComing } from '../helper/date'
import http from '../helper/http'
import Spinner from 'react-native-spinkit'

function NowShowing () {
  const [movie, setMovie] = useState([])
  const [month] = useState(MonthUpComing(6))
  const [isLoading, stopLoading] = useState(true)

  useEffect(() => {
    async function fetchData () {
      const response = await http().get('movies?status=upcoming')
      await setMovie(response.data.pageInfo.results)
      stopLoading(false)
    }
    fetchData()
  }, [])
  const renderItem = ({ item }) => (
    <UpComingCard
      title={item.title}
      image={item.image}
      slug={item.slug}
      genre={item.genre}
    />
  )
  const renderButton = ({ item }) => (
    <ButtonMonth
      radius={'4px'}
      fontSize={'16px'}
      height={'42px'}
      width={'100px'}
    >{item}</ButtonMonth>
  )
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
      <ContainerCard
        horizontal
        data={month}
        keyExtractor={(item) => String(item)}
        renderItem={renderButton}
        ListFooterComponent={<PaddingRight />}
      />
      {isLoading
        ? (<Spinner isVisible={true} size={50} type='Wave' color='#6E7191' />)
        : (<ContainerCard
          horizontal
          data={movie}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ListFooterComponent={<PaddingRight />}
        />)}
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
const ContainerCard = styled.FlatList`
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
