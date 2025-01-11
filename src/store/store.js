import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./socket/socketSlicer.js";
import authReducer from "./auth/authSlice.js";

const store = configureStore({
    reducer: { socket: socketReducer, auth: authReducer },
});

export default store;
