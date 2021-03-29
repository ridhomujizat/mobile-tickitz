import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Header from '../component/Header'
import SignIn from '../screen/SingIn'
import ForgetPassword from '../screen/FogetPassword'
import Home from '../screen/Home'
import DetailMovie from '../screen/DetailMovie'
import Order from '../screen/Order'
import Payment from '../screen/Payment'
import SignUp from '../screen/SignUp'
import Ticket from '../screen/ResultTicket'
import Profile from '../screen/Profile'
import ViewAll from '../screen/ViewAll'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'

const Stack = createStackNavigator()

function Router (props) {
  const { token } = props.auth

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
  }, [])
  return (
    <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
      { token === null && (
        <>
          <Stack.Screen component={SignUp}
            options={{
              headerShown: false
            }}
            name='SignUp' />
          <Stack.Screen component={SignIn}
            options={{
              headerShown: false
            }}
            name='SignIn' />
          <Stack.Screen component={ForgetPassword}
            options={{
              headerShown: false
            }}
            name='ForgetPassword' />
        </>
      )}

      {token && (
        <>
          <Stack.Screen component={Home}
            name='Home' />
          <Stack.Screen component={DetailMovie}
            name='DetailMovie' />
          <Stack.Screen component={Order}
            name='Order' />
          <Stack.Screen component={Payment}
            name='Payment' />
          <Stack.Screen component={Ticket}
            name='Ticket' />
          <Stack.Screen component={Profile}
            name='Profile' />
          <Stack.Screen component={ViewAll}
            name='ViewAll' />
        </>
      )}
    </Stack.Navigator>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Router)
