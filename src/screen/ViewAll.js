import React, { Component } from 'react'
import styled from 'styled-components'
import Search from '../assets/images/logo/search.png'
import Sort from '../assets/images/logo/sort.png'
import SortDesc from '../assets/images/logo/sort-desc.png'
import RNPickerSelect from 'react-native-picker-select'
import { TouchableOpacity, FlatList } from 'react-native'
import spide from '../assets/spider-movie.png'
import http from '../helper/http'
import { API_URL } from '@env'
import { parsingDMY } from '../helper/date'

class ViewAll extends Component {
  state = {
    sort: 'ASC',
    sortValue: null,
    movies: [],
    search: '',
    page: 1,
    refreshing: false
  }

  componentDidMount () {
    this.fetchData()
  }

  async fetchData () {
    const { status } = this.props.route.params
    const response = await http().get(`movies?status=${status}`)
    await this.setState({ movies: response.data.pageInfo.results })
  }
  async onChange (search) {
    const { status } = this.props.route.params
    this.setState({ search: search })

    const response = await http().get(`movies?status=${status}&search=${this.state.search}`)
    await this.setState({ movies: response.data.pageInfo.results })
  }

  async nextPage () {
    const { status } = this.props.route.params
    const { page } = this.state
    const response = await http().get(`movies?status=${status}&page=${page + 1}`)
    await this.setState({ movies: [...this.state.movies, ...response.data.pageInfo.results] })
    await this.setState({ page: page + 1 })
  }

  async changeSort () {
    const { sort, sortValue } = await this.state
    console.log(sort)
    if (sortValue === 'title') {
      if (sort === 'ASC') {
        let sortData
        await this.setState({ sort: 'DESC' })
        sortData = this.state.movies.sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
        this.setState({ movies: sortData })
      } else {
        let sortData
        await this.setState({ sort: 'ASC' })
        sortData = this.state.movies.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        this.setState({ movies: sortData })
      }
    } else if (sortValue === 'releaseDate') {
      if (sort === 'ASC') {
        let sortData
        await this.setState({ sort: 'DESC' })
        sortData = this.state.movies.sort((a, b) => (a.releaseDate < b.releaseDate) ? 1 : ((b.releaseDate < a.releaseDate) ? -1 : 0))
        this.setState({ movies: sortData })
      } else {
        let sortData
        await this.setState({ sort: 'ASC' })
        sortData = this.state.movies.sort((a, b) => (a.releaseDate > b.releaseDate) ? 1 : ((b.releaseDate > a.releaseDate) ? -1 : 0))
        this.setState({ movies: sortData })
      }
    }

  }

  async sort (value) {
    await this.setState({ sortValue: value })
    console.log(this.state.sortValue)
    const { sort, sortValue } = await this.state

    if (sortValue === 'title') {
      if (sort === 'ASC') {
        let sortData
        sortData = this.state.movies.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        this.setState({ movies: sortData })
      } else {
        let sortData
        sortData = this.state.movies.sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
        this.setState({ movies: sortData })
      }
    } else if (sortValue === 'releaseDate') {
      if (sort === 'ASC') {
        let sortData
        sortData = this.state.movies.sort((a, b) => (a.releaseDate > b.releaseDate) ? 1 : ((b.releaseDate > a.releaseDate) ? -1 : 0))
        this.setState({ movies: sortData })
      } else {
        let sortData
        sortData = this.state.movies.sort((a, b) => (a.releaseDate < b.releaseDate) ? 1 : ((b.releaseDate < a.releaseDate) ? -1 : 0))
        this.setState({ movies: sortData })
      }
    }

  }
  render () {
    return (
      <>
        <ContainerSearch>
          <FlexRowBetween>
            <InputSearch
              placeholder='Search Movie'
              onChangeText={(search) => this.onChange(search)}
            // onChangeText={(value) => this.onChangeSearch(value)}
            />
            <Icon source={Search} />
          </FlexRowBetween>
          <FlexRowWrap>
            <TouchableOpacity onPress={() => this.changeSort()} disabled={this.state.sortValue === null ? true : false}>
              <Icon source={this.state.sort === 'ASC' ? Sort : SortDesc} />
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
              // value={this.state.favSport2}
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
export default ViewAll
