import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./socket/socketSlicer.js";
import authReducer from "./auth/authSlice.js";
import roomReducer from "./auth/roomSlice.js";

const store = configureStore({
    reducer: { socket: socketReducer, auth: authReducer, room: roomReducer },
});

export default store;
