import { configureStore } from '@reduxjs/toolkit'
import  productReducer  from './feature/productSlice'
import userReducer from './feature/userSlice'
import cartReducer from './feature/cartSlice'

export const store = configureStore({
  reducer: { 
     productData:productReducer,
      users: userReducer,
       cart: cartReducer,
    },
})