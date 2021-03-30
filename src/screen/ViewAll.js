import React, { Component } from 'react'
import styled from 'styled-components'
import Search from '../assets/images/logo/search.png'
import Sort from '../assets/images/logo/sort.png'
import SortDesc from '../assets/images/logo/sort-desc.png'
import RNPickerSelect from 'react-native-picker-select'
import { TouchableOpacity, FlatList } from 'react-native'
import http from '../helper/http'
import { API_URL } from '@env'
import { parsingDMY } from '../helper/date'
import { connect } from 'react-redux'
import { getMovie } from '../redux/actions/movie'

class ViewAll extends Component {
  state = {
    movies: [],
    refreshing: false,
    query: {
      page: 1,
      search: '',
      order: 'ASC',
      sort: ''
    }
  }

  componentDidMount () {
    // this.setState({ movies: [] })
    this.fetchData()
  }

  async fetchData (value) {
    const { status } = this.props.route.params
    // const response = await http().get(`movies?status=${status}`)
    await this.props.getMovie({ status, ...value })
    const { movieNowShowing, movieUpcoming } = this.props.movie
    if (status === 'released') {
      await this.setState({ movies: movieNowShowing.results })
    } else {
      await this.setState({ movies: movieUpcoming.results })
    }
  }

  async fetchDataNextData (value) {
    const { status } = this.props.route.params
    const { query } = this.state
    await this.setState({
      query: {
        ...query,
        page: query.page + 1
      }
    })
    await this.props.getMovie({ status, ...this.state.query })
    const { movieNowShowing, movieUpcoming } = this.props.movie
    if (status === 'released') {
      await this.setState({ movies: [...this.state.movies, ...movieNowShowing.results] })
    } else {
      await this.setState({ movies: [...this.state.movies, ...movieUpcoming.results] })
    }
  }

  async onChange (search) {
    this.setState({
      query: {
        ...this.state.query,
        search: search
      }
    })

    this.fetchData({ search: search })
  }

  async nextPage () {
    const { status } = this.props.route.params
    const { movieNowShowing, movieUpcoming } = this.props.movie
    if (status === 'released') {
      if (movieNowShowing.totalPage >= this.state.query.page) {
        this.fetchDataNextData()
      }
    } else {
      if (movieUpcoming.totalPage >= this.state.query.page) {
        this.fetchDataNextData()
      }
    }
  }

  async sort (value) {
    await this.setState({
      query: {
        ...this.state.query,
        order: 'ASC',
        sort: value
      }
    })
    await this.fetchData(this.state.query)
  }

  async changeOrder () {
    const order = this.state.query.order === 'ASC' ? 'DESC' : 'ASC'
    await this.setState({
      query: {
        ...this.state.query,
        order
      }
    })
    await this.fetchData(this.state.query)
  }
  render () {
    return (
      <>
        <ContainerSearch>
          <FlexRowBetween>
            <InputSearch
              placeholder='Search Movie'
              onChangeText={(search) => this.onChange(search)}
            />
            <Icon source={Search} />
          </FlexRowBetween>
          <FlexRowWrap>
            <TouchableOpacity onPress={() => this.changeOrder()} disabled={this.state.query.sortValue === null ? true : false}>
              <Icon source={this.state.query.sort === 'ASC' ? Sort : SortDesc} />
            </TouchableOpacity>
            <SelectPicker>
              <RNPickerSelect
                style={{
                  inputAndroid: {
                    fontFamily: 'Mulish-Medium',
                    color: '#4E4B66'
                  }
                }}
                placeholder={{
                  label: 'Sort',
                  value: null
                }}
                items={[
                  { label: 'Title', value: 'title' },
                  { label: 'Release Date', value: 'releaseDate' }
                ]}
                onValueChange={value => {
                  this.sort(value)
                }}
                InputAccessoryView={() => null}
                Icon={() => { return <></> }}
              />
            </SelectPicker>
          </FlexRowWrap>
        </ContainerSearch>
        <FlatList
          data={this.state.movies}
          keyExtractor={(item, index) => String(index)}
          onEndReached={() => this.nextPage()}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('DetailMovie', { slug: item.slug })}
            >
              <Card>
                <FlexRowWrap>
                  <ImageMovie source={{ uri: `${API_URL}${item.image}` }} />
                  <FlexColum>
                    <TitleMovie>{item.title}</TitleMovie>
                    <Genre>{item.genre}</Genre>
                    <Genre>{parsingDMY(item.releaseDate)}</Genre>
                  </FlexColum>
                </FlexRowWrap>
              </Card>
            </TouchableOpacity>
          )}
        />
      </>
    )
  }
}

const ContainerSearch = styled.View`
  padding: 20px
  background-color: #fff
  margin-bottom: 10px
`
const FlexRowBetween = styled.View`
  flex-direction: row
  justify-content: space-between
  align-items: center
`
const Icon = styled.Image`
  width: 25px
  height: 25px
`
const InputSearch = styled.TextInput`
  width: 85%
`
const FlexRowWrap = styled.View`
  flex-direction: row
  align-items: center
`
const SelectPicker = styled.View`
  flex: 1
`
const Card = styled.View`
  margin-horizontal: 20px
  margin-vertical: 5px
  background-color: white
  border-radius: 8px
  height: 150px
`
const ImageMovie = styled.Image`
  width: 90px
  height: 120px
  resizeMode: cover
  margin: 15px
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
const FlexColum = styled.View`
  flex-direction: column
  align-items: flex-start
`

const mapStateToProps = (state) => ({
  movie: state.movie
})
const mapDispatchToProps = { getMovie }
export default connect(mapStateToProps, mapDispatchToProps)(ViewAll)
