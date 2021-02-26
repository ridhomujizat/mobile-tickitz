import React from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import Button from '../Button'
import { API_URL } from '@env'
import { View } from 'react-native'

function UpcomingCard (props) {
  const navigation = useNavigation()
  return (
    <ParentCard >
      <View>
        <RowImage>
          <Image source={{ uri: `${API_URL}${props.image}` }} />
        </RowImage>
        <DetailCard >
          <TitleMovie>{props.title}</TitleMovie>
          <Genre>{props.genre}i</Genre>
        </DetailCard>
      </View>
      <DetailCard >
        <ButtonBookNow
          radius={'4px'}
          height={'25px'}
          fontSize={'12px'}
          color={'#fff'}
          fontColor={'#5F2EEA'}
          border={'solid 1px #5F2EEA'}
          onPress={() => navigation.navigate('DetailMovie', { slug: props.slug })}
        >Detail</ButtonBookNow>
      </DetailCard>
    </ParentCard >

  )
}

const ParentCard = styled.View`
  margin-right: 10px
  border-radius: 8px
  width: 154px
  border: 1px #DEDEDE
  justify-content: space-between
`
const Image = styled.Image`
    height: 185px;
    width: 122px;
    resize-mode: cover;
    border-radius: 8px
    margin: auto
`
const RowImage = styled.View`
  width: 154px
  border-radius: 8px
  padding: 16px
  border-radius: 8px
`
const DetailCard = styled.View`
  padding-horizontal: 16px
`
const TitleMovie = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 14px
  text-align: center
  color: #14142B
`
const Genre = styled.Text`
  font-family: Mulish-Medium
  font-size: 12px
  text-align: center
  color: #A0A3BD
`
const ButtonBookNow = styled(Button)`
  margin-vertical: 10px
`
export default UpcomingCard
