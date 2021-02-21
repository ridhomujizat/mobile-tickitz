import React, { Component } from 'react'
import styled from 'styled-components/native'
import Avenger from '../assets/Avengers_Infinity_War_poster.jpg'
import moment from 'moment';
import { InputDate, InputLocation } from '../component/Form'
import { SchduleCard } from "../component/Card";
import Footer from '../layouts/Footer'

class DetailMovie extends Component {
  state = {
    date: new Date(),
    location: null,
    showDatePicker: false,
    onPressed: false
  }

  onChangeDate (event, selectedDate) {
    try {
      const currentDate = selectedDate || date;
      this.setState({ showDatePicker: false })
      this.setState({ date: currentDate })
      this.setState({ onPressed: true })
    } catch {
      this.setState({ showDatePicker: false })
    }
  }
  showPicker = () => {
    this.setState({ showDatePicker: true })
  }
  showLocation = () => {
  }
  onChangeLocation = (value) => {
    this.setState({ location: value })
  }

  render () {
    return (
      <>
        <Container>
          <Wrapper>
            <ImageContainer>
              <Image source={Avenger} />
            </ImageContainer>
            <Title>Spider-Man: Homecoming</Title>
            <Genre>Adventure, Action, Sci-Fi</Genre>
            <ContentWrap>
              <ContentRow>
                <Label>Release date</Label>
                <Text>June 28, 2017</Text>
              </ContentRow>
              <ContentRow>
                <Label>Directed by</Label>
                <Text>Jon Watss</Text>
              </ContentRow>
              <ContentRow>
                <Label>Duratione</Label>
                <Text>2 hrs 13 min</Text>
              </ContentRow>
              <ContentRow>
                <Label>Casts</Label>
                <Text>
                  Tom Holland,
                  Robert Downey Jr.,
                  etc.
                </Text>
              </ContentRow>
            </ContentWrap>
            <SynopsisWrap>
              <Text>Synopsis</Text>
              <SynopsisText>
                Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened.
              </SynopsisText>
            </SynopsisWrap>
          </Wrapper>

          <SelectSchedulWrap>
            <ScheduleText>Showtimes and Tickets</ScheduleText>
            <DatePicker
              date={this.state.date}
              onChange={(event, selectedDate) => this.onChangeDate(event, selectedDate)}
              show={this.state.showDatePicker}
              onPress={this.showPicker}
              onPressed={this.state.onPressed}
            />
            <LocationPicker
              onValueChange={(value) => this.onChangeLocation(value)}
            />
            <SelectScheduleWrapper>
              <SchduleCard />
              <SchduleCard />
              <SchduleCard />
            </SelectScheduleWrapper>
          </SelectSchedulWrap>
          <Footer />
        </Container>
      </>
    )
  }
}

const Container = styled.ScrollView`
  background-color: #fff
`
const Wrapper = styled.View`
  padding-horizontal: 30px
`
const ImageContainer = styled.View`
  margin: auto
  margin-top: 37px
  margin-bottom: 32px
  width: 223px
  height : 308px
  border-radius: 16px
  border: 0.5px solid #DEDEDE
`
const Image = styled.Image`
  width: 159px
  height: 244px
  border-radius: 8px
  margin: auto
`
const Title = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 20px
  margin-bottom: 10px
  text-align: center
`
const Genre = styled(Title)`
  font-size: 18px
  color: #4E4B66
`
const ContentWrap = styled.View`
  flex-direction: row
  flex-wrap: wrap
  margin-top: 30px
`
const ContentRow = styled.View`
  width: 150px
  margin-bottom: 20px
  padding-right: 10px
`
const Text = styled.Text`
  font-family: Mulish-Medium
  font-size: 16px
  color: #121212
`
const Label = styled.Text`
  font-family: Mulish-Medium
  font-size: 14px
  color: #8692A6
`
const SynopsisWrap = styled.View`
  margin-vertical: 40px
`
const SynopsisText = styled(Label)`
  margin-top: 15px
`
const SelectSchedulWrap = styled.View`
  padding-horizontal: 30px
  padding-vertical: 40px
  background-color: #F5F6F8
`
const ScheduleText = styled.Text`
  font-family: Mulish-SemiBold
  font-size: 20px
  text-align: center
`
const DatePicker = styled(InputDate)`
  margin-vertical: 20px
`
const LocationPicker = styled(InputLocation)`
  margin-bottom: 20px
`
const SelectScheduleWrapper = styled.View`
  margin-vertical: 15px
  align-items: center
`
export default DetailMovie
