import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TouchableOpacity } from 'react-native'
import { NowShowingCard } from '../component/Card'
import http from '../helper/http'
import Spinner from 'react-native-spinkit'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { getMovie } from '../redux/actions/movie'

function NowShowing (props) {
  const [isLoading, stopLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    async function fetchData () {
      await props.getMovie({ status: 'released' })
      stopLoading(false)
    }
    fetchData()
  }, [])

  const renderItem = ({ item }) => (
    <NowShowingCard
      title={item.title}
      image={item.image}
      genre={item.genre}
      slug={item.slug}
    />
  )
  return (
    <Row>
      <RowText>
        <View>
          <Text>Now Showing</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ViewAll', { status: 'released' })}>
          <View>
            <TextViewAll>ViewAll</TextViewAll>
          </View>
        </TouchableOpacity>
      </RowText>
      {isLoading
        ? (<WrapperIndicator><Spinner isVisible={true} size={50} type='Wave' color='#6E7191' /></WrapperIndicator>)
        : (props.movie.errorMessage
          ? <WrapperIndicator><TextError>{props.movie.errorMessage}</TextError></WrapperIndicator>
          : <ContainerCard
            horizontal
            data={props.movie.movieNowShowing.results}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            ListFooterComponent={<PaddingRight />}
          />)}
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
const WrapperIndicator = styled.View`
  align-items: center
  justify-content: center
  height: 90px
`
const mapStateToProps = (state) => ({
  movie: state.movie
})
const mapDispatchToProps = { getMovie }
export default connect(mapStateToProps, mapDispatchToProps)(NowShowing)
