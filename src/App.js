import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Header from './component/Navigation/Header'
import SignIn from './screen/SingIn'
import ForgetPassword from './screen/FogetPassword'
import Home from './screen/Home'
import DetailMovie from './screen/DetailMovie'
import Order from './screen/Order'
import Payment from './screen/Payment'
import SignUp from './screen/SignUp'
import Ticket from './screen/ResultTicket'

const Stack = createStackNavigator()

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
