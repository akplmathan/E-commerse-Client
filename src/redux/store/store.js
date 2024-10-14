import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import productReducer from '../slice/productSlice'

export const store = configureStore({
    reducer:{
        userInfo:userReducer,
        productInfo:productReducer
    }
})

export default store;