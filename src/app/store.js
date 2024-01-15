import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import todoReducer from '../features/todo/slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
  },
})
