import React, { Component } from 'react'
import styled from 'styled-components/native'
import { InputDate, InputLocation } from '../component/Form'
import { SchduleCard } from "../component/Card";
import Footer from '../component/Footer'
import http from '../helper/http'
import { API_URL } from '@env'
import { parsingDMY } from "../helper/date";
import Loading from '../component/LoadingScreen'
import Spinner from 'react-native-spinkit'
import { FlatList, SafeAreaView } from 'react-native'
import qs from 'querystring'
import { connect } from 'react-redux'

class DetailMovie extends Component {
  state = {
    loadingMovie: true,
    loadingCinemas: true,
    date: new Date(),
    idLocation: null,
    showDatePicker: false,
    onPressed: false,
    movie: {},
    cinemas: [],
    errorMessage: null
  }

  async componentDidMount () {
    const { slug } = this.props.route.params
    try {
      const resultMovie = await http().get(`/movies/${slug}`)
      await this.setState({
        movie: resultMovie.data.results
      })
      setTimeout(() => {
        this.setState({ loadingMovie: false })

      }, 600)
    } catch (err) {
      this.setState({ errorMessage: err.response.data.message })
    }
  }

  async getSchedule () {
    try {
      const { idLocation, onPressed, date } = this.state
      const newDate = date.toISOString().slice(0, 10)

      const { slug } = this.props.route.params
      const query = qs.stringify({ date: newDate, idLocation })
      if (idLocation && onPressed) {
        this.props.dispatch({ type: 'REMOVE_SCHEDULE' })

        await this.setState({ errorMessage: null })
        const response = await http().get(`/schedule/?slug=${slug}&${query}`)

        await this.setState({ cinemas: response.data.results.cinema })
        await setTimeout(() => {
          this.setState({ loadingCinemas: false })
        }, 500)
      }
    } catch (err) {
      this.setState({ errorMessage: err.response.data.message })
      setTimeout(() => {
        this.setState({ loadingCinemas: false })
      }, 500)
    }
  }

  onChangeDate (event, selectedDate) {
    try {
      const currentDate = selectedDate || date;
      this.setState({
        showDatePicker: false,
        date: currentDate,
        onPressed: true,
        loadingCinemas: true
      })
      this.getSchedule()
    } catch {
      this.setState({ showDatePicker: false })
    }
  }
  showPicker = () => {
    this.setState({ showDatePicker: true })
  }
  onChangeLocation = async (value) => {
    await this.setState({ idLocation: value })
    this.getSchedule()
    this.setState({ loadingCinemas: true })
  }

  render () {
    const { showDatePicker, date, movie, loadingMovie, idLocation, onPressed, loadingCinemas, errorMessage, cinemas } = this.state
    return (
      <>
        <Loading isLoading={loadingMovie} />
        <Container showsVerticalScrollIndicator={false} >
          <Wrapper>
            <ImageContainer>
              <Image source={{ uri: `${API_URL}${movie.image}` }} />
            </ImageContainer>
            <Title>{movie.title}</Title>
            <Genre>{movie.genre}</Genre>
            <ContentWrap>
              <ContentRow>
                <Label>Release date</Label>
                <Text>{parsingDMY(movie.releaseDate)}</Text>
              </ContentRow>
              <ContentRow>
                <Label>Directed by</Label>
                <Text>{movie.directed}</Text>
              </ContentRow>
              <ContentRow>
                <Label>Duratione</Label>
                <Text>{movie.hour} hrs {movie.minute} min</Text>
              </ContentRow>
              <ContentRow>
                <Label>Casts</Label>
                <Text>{movie.casts}</Text>
              </ContentRow>
            </ContentWrap>
            <SynopsisWrap>
              <Text>Synopsis</Text>
              <SynopsisText>
                {movie.description}
              </SynopsisText>
            </SynopsisWrap>
          </Wrapper>
          {movie.status === 'released' && (
            <SelectSchedulWrap>
              <ScheduleText>Showtimes and Tickets</ScheduleText>
              <DatePicker
                date={date}
                onChange={(event, selectedDate) => this.onChangeDate(event, selectedDate)}
                show={showDatePicker}
                onPress={this.showPicker}
                onPressed={onPressed}
              />
              <LocationPicker
                onValueChange={(value) => this.onChangeLocation(value)}
              />
              {idLocation && onPressed
                ? loadingCinemas
                  ? (<ChooseFirst>
                    <Spinner isVisible={true} size={50} type='Wave' color='#6E7191' />
                  </ChooseFirst>)
                  : errorMessage
                    ? (<ChooseFirst>
                      <TextChooseFirst>{errorMessage}</TextChooseFirst>
                    </ChooseFirst>)
                    : (<SelectScheduleWrapper>
                      {cinemas.map(item => {
                        return (
                          <SchduleCard
                            key={String(item.idCinema)}
                            title={movie.title}
                            image={item.image}
                            idMovie={item.id}
                            idCinema={item.idCinema}
                            name={item.name}
                            address={item.address}
                            price={item.price}
                            showTime={item.showTime}
                            date={item.date}
                          />
                        )
                      })}
                    </SelectScheduleWrapper>)
                : (<ChooseFirst>
                  <TextChooseFirst>Choose date and location first</TextChooseFirst>
                </ChooseFirst>)
              }

            </SelectSchedulWrap>
          )}
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
  padding: 30px
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
const ChooseFirst = styled.View`
  padding: 30px
  align-items: center
`
const TextChooseFirst = styled(Text)`
  color: #A0A3BD
`
const mapStateToProps = (state) => ({
  order: state.order
})
export default connect(mapStateToProps)(DetailMovie)
