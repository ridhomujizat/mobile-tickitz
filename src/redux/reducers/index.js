import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import authReducer from './auth'
import orderReducer from './order'
import movieReducer from './movie'

const authConfig = {
  key: 'authReducer',
  storage: AsyncStorage,
  stateReconciler: hardSet
}

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  order: orderReducer,
  movie: movieReducer
})

export default reducer
