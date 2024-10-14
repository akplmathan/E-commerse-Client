import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  parent: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.product = action.payload;
    }
  },
});



export const {addProduct} = productSlice.actions;
export default productSlice.reducer;