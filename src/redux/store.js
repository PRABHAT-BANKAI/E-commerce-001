import { configureStore } from '@reduxjs/toolkit'
import  productReducer  from './feature/productSlice'
import userReducer from './feature/userSlice'

export const store = configureStore({
  reducer: { 
     productData:productReducer,
      users: userReducer
    },
})