import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter/counterSlice'
import pokemonsReducer from './pokemons/pokemons'
import { useDispatch, useSelector } from 'react-redux'
import { localStorageMiddleware } from './middlewares/localstorage-middleware'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( localStorageMiddleware)
})


// Toda esta parte del código es para el tipado estricto ya que estamos trabajando en Typescript

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();