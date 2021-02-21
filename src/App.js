import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Header from './component/Navigation/Header'
import SignIn from './page/SingIn'
import SingnUp from './page/SignUp'
import ForgetPassword from './page/FogetPassword'
import Home from './page/Home'
import DetailMovie from './page/DetailMovie'
import Order from './page/Order'

const Stack = createStackNavigator()

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
        <Stack.Screen component={SingnUp}
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
