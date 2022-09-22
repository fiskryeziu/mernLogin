import { configureStore } from '@reduxjs/toolkit'
import userLoginReducer from './userLoginSlice'

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
  },
})

export { store }
