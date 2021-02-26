import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './routes/Router'
import { Provider } from 'react-redux'
import persistedStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from 'react-native-flash-message'

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
