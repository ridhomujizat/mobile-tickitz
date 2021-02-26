import React, { Component } from 'react'
import styled from 'styled-components/native'
import { LogoPurple } from '../Logo'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Button from '../Button/index'
import { API_URL } from '@env'
import { connect } from 'react-redux'

class Header extends Component {
  state = {
    headerShow: false
  }
  navigateToMenu (value) {
    const { navigation } = this.props
    this.setState({ headerShow: false })
    navigation.navigate(value)
  }
  logout () {
    const { navigation } = this.props
    this.props.dispatch({ type: 'LOGOUT' })
  }
  render () {
    return (
      <>
        <Root>
          <LogoPurple width={'80px'} height={'40px'} disabled />
          <TouchableOpacity onPress={() =>
            this.setState({ headerShow: this.state.headerShow ? false : true })
          }>
            <ImageMenu source={{ uri: `${API_URL}${this.props.auth.image}` }} />
          </TouchableOpacity>
        </Root>
        {this.state.headerShow && (
          <MenuList>
            <TouchableOpacity onPress={() => this.navigateToMenu('Home')}>
              <ListRow>
                <List>Movies</List>
              </ListRow>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigateToMenu('Profile')}>
              <ListRow >
                <List>Profile</List>
              </ListRow>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.logout()}>
              <ButtonLogout
                color='#DEDEDE'
                height='35px'
                radius='8px'
              >
                Logout
            </ButtonLogout>
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
  resizeMode: cover
  border-radius: 35px
`
const MenuList = styled.View`
  background-color: #fafafa
  padding-vertical: 15px
  position: absolute
  width: 100%
  top: 50px
  z-index: 1
`
const ListRow = styled.View`
  padding: 5px
  width: 100%
`
const List = styled.Text`
  font-family: Mulish-Medium
  margin: auto
`
const ButtonLogout = styled(Button)`
  padding: 5px
  margin-horizontal: 20px
`
function NavigationHeader (props) {
  const navigation = useNavigation();
  return <Header {...props} navigation={navigation} />;
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(NavigationHeader)