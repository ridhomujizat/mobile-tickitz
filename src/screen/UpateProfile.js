import React, { Component } from 'react'
import styled from 'styled-components/native'
import dot from '../assets/images/logo/dot.png'
import user from '../assets/images/user.jpeg'
import { TouchableOpacity } from 'react-native'
import { InputPassword, InputText, InputPhoneNumber } from '../component/Form'
import Button from '../component/Button'
import Footer from '../component/Footer'

class UpdateProfile extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Card>
            <FlexRow>
              <Title>Info</Title>
              <TouchableOpacity>
                <Icon source={dot} />
              </TouchableOpacity>
            </FlexRow>
            <TouchableOpacity>
              <ProfilePicture source={user} />
            </TouchableOpacity>
            <NameText>Jonas El Rodriguez</NameText>
            <UserRank>Moviegoers</UserRank>
            <Line />
            <Title>Loyalty Points</Title>

            <TitleCenter>180 points become a master</TitleCenter>
            <ProgressPoint>
              <ProgressStatus status={'50%'} />
            </ProgressPoint>
          </Card>
          <Label>Account Settings</Label>
          <Card>
            <Title>Details Information</Title>
            <LineSort />
            <FormText
              label='Full Name'
              placeholder='Write Your Full Name'
            />
            <FormText
              label='Email'
              placeholder='Write your email'
              autoCompleteType='email'
              keyboardType='email-address'
              textContentType='emailAddress'
            />
            <FormPhoneNumber
              label='Phone Number'
              placeholder='Write Your Number'
            />
          </Card>
          <Card>
            <Title>Change Password</Title>
            <LineSort />
            <FormPassword
              label='New Password'
              placeholder='Write your Password'
            />
            <FormPassword
              label='Confirm Password'
              placeholder='Write your Password'
            />
          </Card>
          <Button
            height='45px'
            radius='8px'

          >
            Update Changes
          </Button>
        </Row>
        <Footer />
      </Container>
    )
  }
}

const Container = styled.ScrollView`
  background-color: #D6D8E7
`
const Row = styled.View`
  padding: 30px
`
const Card = styled.View`
  padding: 25px
  border-radius: 16px
  width: 100%
  background-color: #fff
  margin-bottom: 20px
`
const FlexRow = styled.View`
  flex-direction: row
  justify-content: space-between
  margin-top: 20px
  margin-bottom: 30px
`
const Title = styled.Text`
  font-family: Mulish-Medium
  font-size: 16px
  color: #4E4B66
`
const TitleCenter = styled(Title)`
  text-align: center
`
const Icon = styled.Image`
  height: 26px
  width: 26px
`
const ProfilePicture = styled.Image`
  height: 140px
  width: 140px
  border-radius: 100px
  justify-content: center
  margin: auto
`
const NameText = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 20px
  margin-top: 20px
  margin-bottom: 5px
  text-align: center
`
const UserRank = styled.Text`
  font-family: Mulish-Medium
  font-size: 12px
  color: #4E4B66
  text-align: center
`
const Line = styled.View`
  width: 100%
  height: 1px
  border: 0.5px #DEDEDE
  margin-vertical: 40px
`
const LineSort = styled(Line)`
  margin-top: 10px
  margin-bottom: 20px
`
const ProgressPoint = styled.View`
  width: 100%
  border-radius: 50px
  height: 15px
  margin-top: 15px
  margin-bottom: 50px
  background-color: #DEDEDE
`
const ProgressStatus = styled.View`
  width: ${props => props.status}
  height: 100%
  border-radius: 50px
  background-color: #5F2EEA
`
const Label = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 18px
  color: #14142B
  margin-vertical: 10px
`
const FormText = styled(InputText)`
  margin-vertical: 10px
`
const FormPhoneNumber = styled(InputPhoneNumber)`
  margin-vertical: 10px
`
const FormPassword = styled(InputPassword)`
  margin-vertical: 10px
`
export default UpdateProfile
