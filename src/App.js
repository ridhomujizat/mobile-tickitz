import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './routes/Router'
import { Provider } from 'react-redux'
import persistedStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from 'react-native-flash-message'
import PushNotification from 'react-native-push-notification'

PushNotification.createChannel(
  {
    channelId: 'ticket', // (required)
    channelName: 'Complate payment', // (required)
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: 4,
    vibrate: true
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
)
const App = () => {
  const { store, persistor } = persistedStore()

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Router />
          <FlashMessage position="top" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
