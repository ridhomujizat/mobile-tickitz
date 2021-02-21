import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import spiderman from '../assets/images/hero/spiderman.png'
import lion from '../assets/images/hero/lion.png'
import pience from '../assets/images/hero/peince.png'

function Home () {
  return (
    <Row>
      <SmallText>Nearest Cinema, Newest Movie,</SmallText>
      <LargeText>Find out now!</LargeText>
      <ContainerImage>
        <FristImage source={spiderman} />
        <SecondImage source={lion} />
        <Image source={pience} />
      </ContainerImage>
    </Row>
  )
}
const Row = styled.View`
  padding: 30px
  margin: auto
`
const SmallText = styled.Text`
  font-size: 14px
  color: #A0A3BD
  font-family: Mulish-Medium
`

const LargeText = styled.Text`
font-size: 32px
color: #5F2EEA
font-family: Mulish-Bold
margin-bottom: 10px
`

const ContainerImage = styled.View`
  height: 500px
  flex-direction: row;
  margin-bottom: 50px
`
const Image = styled.Image`
  border-radius: 16px
  height: 350px
  margin: 5px
  width: 90px
`
const FristImage = styled(Image)`
  margin-Top: 150px
`
const SecondImage = styled(Image)`
  margin-Top: 75px
`
export default Home
