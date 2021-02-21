import React, { Component } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity, Text } from 'react-native'
import { LogoPurple } from '../Logo'
import Menu from '../../assets/images/logo/menu.png'

class Header extends Component {
  state = {
    headerShow: false
  }
  render () {
    return (
      <Parent>
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
            <TouchableOpacity>
              <ListRow>
                <List>Movies</List>
              </ListRow>
            </TouchableOpacity>
            <TouchableOpacity>
              <ListRow>
                <List>Cinemas</List>
              </ListRow>
            </TouchableOpacity>
          </MenuList>
        )}
      </Parent>
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
  elevation: 4
`
const ImageMenu = styled.Image`
  height: 35px
  width: 35px
`
const MenuList = styled.View`
  width: 100%
  position: absolute
  top: 55px
  background-color: #fafafa
`
const ListRow = styled.View`
  height: 50px
  width: 100%
`
const List = styled.Text`
  font-family: Mulish-Medium
  margin: auto
`
export default Header