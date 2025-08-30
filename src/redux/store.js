import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/productSlice";
import userReducer from "./feature/userSlice";

import cartReducer, { persistCart } from "./feature/cartSlice";

import loginReducer from "./feature/loginSlice";
import homeReducer from "./feature/homeSlice";

export const store = configureStore({
  reducer: {
    productData: productReducer,
    users: userReducer,
    cart: cartReducer,
    login: loginReducer,
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistCart),
});
