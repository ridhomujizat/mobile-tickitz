import React from 'react'
import styled from 'styled-components/native'
import spider from '../../assets/Avengers_Infinity_War_poster.jpg'
import Button from '../Button'
import { useNavigation } from '@react-navigation/native'

function NowShowingCard (props) {
  const navigation = useNavigation()
  return (
    <ParentCard >
      <RowImage>
        <Image source={spider} />
      </RowImage>
      <DetailCard >
        <TitleMovie>Spider-Man: Home Coming</TitleMovie>
        <Genre>Action, Adventure,Sci-Fi</Genre>
        <ButtonBookNow
          radius={'4px'}
          height={'25px'}
          fontSize={'12px'}
          onPress={() => navigation.navigate('DetailMovie')}
        >Book Now</ButtonBookNow>
      </DetailCard>
    </ParentCard >

  )
}

const ParentCard = styled.View`
  margin-right: 10px
  border-radius: 8px
  border-radius: 8px
  width: 154px
  background-color: #fff
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
  border: 1px
  padding: 16px
  border-radius: 8px
  border: 1px #fff
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
export default NowShowingCard
