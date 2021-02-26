import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { View } from 'react-native'
import Icon from '../../assets/images/logo/date.png'
import Forward from '../../assets/images/logo/forward.png'
import { parsingDMY } from '../../helper/date'

function InputDate (props) {
  return (
    <Container style={props.style} onPress={props.onPress}>
      <View>
        <Button>
          <Wrapper>
            <Image source={Icon} />
            <Text>{!props.onPressed ? 'Set a Date' : parsingDMY(props.date)}</Text>
          </Wrapper>
          <ImageSmall source={Forward} />
        </Button>
        {props.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={props.date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={props.onChange}
          />
        )}
      </View>
    </Container>
  )
}

const Container = styled.TouchableHighlight`
  border-radius: 16px
`
const Button = styled.View`
  border-radius: 16px
  background-color: #EFF0F6
  flex-direction: row
  justify-content: space-between
  padding-vertical: 10px
  padding-horizontal: 30px
  align-items: center
`
const Wrapper = styled.View`
flex-direction: row
align-items: center
`
const Image = styled.Image`
  width: 30px
  height: 30px
`
const Text = styled.Text`
  font-family: Mulish-SemiBold
  color: #4E4B66
  font-size: 16px
  padding-left: 20px
`
const ImageSmall = styled(Image)`
  resizeMode: contain
  width: 20px
`

export default InputDate
