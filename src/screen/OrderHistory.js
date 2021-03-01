import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import Cinema from '../assets/images/cinemas/ebv.id.png'
import Button from '../component/Button'
import Footer from '../component/Footer'
import http from '../helper/http'
import { parsingDMY } from '../helper/date'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { API_URL } from '@env'

function OrderHistor (props) {
  const [dataHistory, setOrderHistory] = useState([])
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const { token } = props.auth
    async function response () {
      const response = await http(token).get('/transaction/order-history/')
      setOrderHistory(response.data.results)
    }
    response()
  }, [])
  const onRefresh = useCallback(async () => {
    const { token } = props.auth
    setRefreshing(true)
    const response = await http(token).get('/transaction/order-history/')
    setOrderHistory(response.data.results)
    setRefreshing(false)
  }, [])
  return (
    <Container
      data={dataHistory}
      keyExtractor={(item, index) => String(index)}
      ListFooterComponent={() => <Footer />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => (
        <Card>
          <ImageCinema source={{ uri: `${API_URL}${item.image}` }} />
          <DateText>{parsingDMY(item.date)}- {item.time.slice(0, 5)}</DateText>
          <Title>{item.title}</Title>
          <Line />
          {item.status === 'success'
            ? (
              <Button
                height='40px'
                radius='8px'
                color='#00BA88'
                onPress={() => navigation.navigate('Ticket', { id: item.id })}
              >
                Ticket in active
              </Button>)
            : (<Button
              height='40px'
              radius='8px'
              color='#F4B740'
              onPress={() => navigation.navigate('Payment', { id: item.id })}
            >
              Complate Your Payment
            </Button>)}
        </Card>
      )}
    />
  )
}

const Container = styled.FlatList`
  background-color: #D6D8E7
`

const Card = styled.View`
  padding: 25px
  border-radius: 16px
  background-color: #fff
  margin-: 20px
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
const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(OrderHistor)
