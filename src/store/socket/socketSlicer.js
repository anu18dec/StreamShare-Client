import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null,
    },
    reducers: {
        setSocket: (state, payload) => {
            state.socket = payload.socket;
        },
        removeSocket: (state) => {
            state.socket = null;
        },
    },
});

export const { setSocket, removeSocket } = socketSlice.actions;

export const initializeSocket = (dispatch) => {
    const socket = io(import.meta.env.VITE_SERVER_URL);

    dispatch(setSocket({ socket }));
};

export default socketSlice.reducer;
