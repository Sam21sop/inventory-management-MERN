import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlices/userSlice";
import productReducer from "./productSlices/productSlice";


const store = configureStore({
    reducer:{
        user: userReducer,
        product: productReducer
    }
});

export default store;