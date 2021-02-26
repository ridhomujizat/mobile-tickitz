import React, { Component } from 'react'
import styled from 'styled-components'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { Dimensions, Text } from 'react-native'
import UpdateProfile from './UpateProfile'
import OrderHistory from './OrderHistory'
import Footer from '../component/Footer'
import Loading from '../component/LoadingScreen'

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'ProfileUpdate', title: 'Profile' },
      { key: 'orderHistory', title: 'Order History' }
    ]
  }

  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#5F2EEA' }}
      style={{ backgroundColor: '#fff' }}
      renderLabel={({ route, focused, color }) => (
        <Label
          focused={focused}
        >
          {route.title}
        </Label>
      )}
    />
  )
  initialLayout = { width: Dimensions.get('window').width }
  renderScene = SceneMap({
    ProfileUpdate: UpdateProfile,
    orderHistory: OrderHistory,
  })
  render () {
    const { index, routes } = this.state
    return (
      <>
        <Loading />
        <Container>
          <Row>
            <TabView
              renderTabBar={this.renderTabBar}
              navigationState={{ index, routes }}
              renderScene={this.renderScene}
              onIndexChange={index => this.setState({ index })}
              initialLayout={Dimensions.get('window').width}
            />
          </Row>
          <Footer />
        </Container>
      </>
    )
  }
}

const Container = styled.ScrollView`
 background-color: #D6D8E7
`
const Row = styled.View`
  flex: 1
`
const Label = styled.Text`
  font-family: Mulish-Medium
  font-size: 14px
  color: ${props => props.focused ? '#14142B' : '#AAAA'}
`

export default Profile