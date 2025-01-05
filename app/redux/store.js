"use client"
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import cartReducer from './cartSlice'
import audioReducer from './audioSlice'
import settingsReducer from './settingsSlice'
import thunk from 'redux-thunk'

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem(key, value) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    }
  }
}

const storage = typeof window !== 'undefined' 
  ? createWebStorage('local')
  : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    audio: audioReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }),
})

export const persistor = persistStore(store)
