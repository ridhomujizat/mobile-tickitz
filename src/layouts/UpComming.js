import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native'
import { UpComingCard } from '../component/Card'
import Button from '../component/Button'
import { MonthUpComing } from '../helper/date'
import Spinner from 'react-native-spinkit'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { getMovie } from '../redux/actions/movie'

function UpComing (props) {
  const [month] = useState(MonthUpComing(6))
  const [isLoading, stopLoading] = useState(true)
  const navigation = useNavigation()
  const [clicked, setClicked] = useState('')

  useEffect(() => {
    async function fetchData () {
      await props.getMovie({ status: 'upcoming' })
      stopLoading(false)
    }
    fetchData()
  }, [])
  async function fetchData () {
    await props.getMovie({ status: 'upcoming' })
    stopLoading(false)
  }
  const monthUpcoming = async (value) => {
    if (clicked !== value) {
      setClicked(value)
      const monthNumber = month.indexOf(value) + 1
      await props.getMovie({ status: 'upcoming', month: monthNumber })
    } else {
      fetchData()
      setClicked('')
    }
  }
  const renderItem = ({ item }) => (
    <UpComingCard
      title={item.title}
      image={item.image}
      slug={item.slug}
      genre={item.genre}
    />
  )
  const renderButton = ({ item }) => {
    if (clicked === item) {
      return (
        <ButtonMonth
          radius={'4px'}
          fontSize={'16px'}
          height={'42px'}
          width={'110px'}
          onPress={(value) => monthUpcoming(`${item}`)}
        >{item}</ButtonMonth>
      )
    } else {
      return (
        <ButtonMonth
          radius={'4px'}
          fontSize={'16px'}
          height={'42px'}
          width={'110px'}
          color={'#fff'}
          fontColor={'#5F2EEA'}
          border={'solid 1px #5F2EEA'}
          onPress={(value) => monthUpcoming(`${item}`)}
        >{item}</ButtonMonth>
      )
    }
  }

  return (
    <Row>
      <RowText>
        <View>
          <Text>Upcoming Movies</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ViewAll', { status: 'upcoming' })} >
          <View>
            <TextViewAll>View All</TextViewAll>
          </View>
        </TouchableOpacity>
      </RowText>
      <ContainerCard
        horizontal
        data={month}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderButton}
        ListFooterComponent={<PaddingRight />}
      />
      {isLoading
        ? (<WrapperIndicator><Spinner isVisible={true} size={50} type='Wave' color='#6E7191' /></WrapperIndicator>)
        : (props.movie.errorMessage
          ? <WrapperIndicator><TextError>{props.movie.errorMessage}</TextError></WrapperIndicator>
          : <ContainerCard
            horizontal
            data={props.movie.movieUpcoming.results}
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
const TextError = styled.Text`
  font-size: 18px
  font-family: Mulish-Medium
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
const WrapperIndicator = styled.View`
  align-items: center
  height: 90px
`

const mapStateToProps = (state) => ({
  movie: state.movie
})
const mapDispatchToProps = { getMovie }
export default connect(mapStateToProps, mapDispatchToProps)(UpComing)
