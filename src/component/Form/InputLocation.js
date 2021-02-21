import React from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import Location from '../../assets/images/logo/location.png'
import Forward from '../../assets/images/logo/forward.png'
import RNPickerSelect from 'react-native-picker-select'

function InputLocation (props) {
  return (
    <Container style={props.style} onPress={props.onPress}>
      <View>
        <Button>
          <Image source={Location} />
          <SelectPicker>
            <RNPickerSelect
              onValueChange={props.onValueChange}
              style={{
                inputAndroid: {
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                  fontFamily: 'Mulish-Medium',
                  color: '#4E4B66'
                },
                iconContainer: {
                  top: 9,
                  right: 0
                },
                placeholder: {
                  fontSize: 16,
                  fontFamily: 'Mulish-Medium',
                  color: '#4E4B66'
                }
              }}
              placeholder={{
                label: 'Select a Location',
                value: null
              }}
              Icon={() => { return <ImageSmall source={Forward} /> }}
              items={[
                { label: 'Jakarta', value: 'jakarta' },
                { label: 'Karawang', value: 'Karawang' }
              ]}

            />
          </SelectPicker>
        </Button>
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
  padding-vertical: 5px
  padding-horizontal: 30px
  align-items: center
`
const Image = styled.Image`
  width: 25px
  height: 25px
  margin-right: 10px
`

const ImageSmall = styled.Image`
  resizeMode: contain
  width: 20px
`
const SelectPicker = styled.View`
  flex: 1
`
export default InputLocation
