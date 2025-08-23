import { configureStore } from '@reduxjs/toolkit'
import  productReducer  from './feature/productSlice'
import userReducer from './feature/userSlice'
import cartReducer from './feature/cartSlice'
import loginReducer from './feature/loginSlice'

export const store = configureStore({
  reducer: { 
     productData:productReducer,
      users: userReducer,
       cart: cartReducer,
       login: loginReducer,
    },
})