import { createSlice } from '@reduxjs/toolkit'

const initialState = {
user:[],
products:[]
}

export const productSlice = createSlice({
  name: 'e-commerc',
  initialState,
  reducers: {
  
  },
})

// Action creators are generated for each case reducer function
export const { } = productSlice.actions

export default productSlice.reducer