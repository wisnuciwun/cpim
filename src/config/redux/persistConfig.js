import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
 
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['companies', 'offices', 'companyId', 'officeId'],
  blacklist: []
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
export let store = createStore(persistedReducer, applyMiddleware(thunk));

export let persistor = persistStore(store)