import React, { Component } from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { LogoPurple } from '../Logo'
import Menu from '../../assets/images/logo/menu.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Header extends Component {
  state = {
    headerShow: false
  }
  navigateToMovie (value) {
    console.log(value)
    // this.props.navigation.navigate('Ticket')
  }
  render () {
    return (
      <>
        <Root>
          <LogoPurple width={'80px'} height={'40px'} />
          <TouchableOpacity onPress={() =>
            this.setState({ headerShow: this.state.headerShow ? false : true })
          }>
            <ImageMenu source={Menu} />
          </TouchableOpacity>
        </Root>
        {this.state.headerShow && (
          <MenuList>
            <TouchableOpacity onPress={() => this.navigateToMovie('a')}>
              <ListRow>
                <List>Movies</List>
              </ListRow>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigateToMovie('b')}>
              <ListRow >
                <List>Cinemas</List>
              </ListRow>
            </TouchableOpacity>
          </MenuList>
        )}
      </>
    )
  }
}

const Parent = styled.View`
  position: relative
`
const Root = styled.View`
  height: 60px
  justify-content: space-between
  flex-direction: row
  padding-horizontal: 30px
  align-items: center
  elevation: 1
  background-color: #fff
`
const ImageMenu = styled.Image`
  height: 35px
  width: 35px
`
const MenuList = styled.View`
  background-color: #fafafa
  padding-vertical: 15px
  position: absolute
  width: 100%
  top: 50px
`
const ListRow = styled.View`
  padding: 5px
  width: 100%
`
const List = styled.Text`
  font-family: Mulish-Medium
  margin: auto
`
export default Header