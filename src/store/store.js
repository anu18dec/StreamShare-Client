import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./socket/socketSlicer.js";
import authReducer from "./auth/authSlice.js";
import roomReducer from "./room/roomSlice.js";
import roomMembersReducer from "./room/roomMembersSlice.js";
import incomingFilesReducer from "./room/incomingFilesSlice.js";
import errorReducer from "./error/errorSlice.js";

const store = configureStore({
    reducer: {
        socket: socketReducer,
        auth: authReducer,
        room: roomReducer,
        roomMembers: roomMembersReducer,
        incomingFiles: incomingFilesReducer,
        error: errorReducer,
    },
});

export default store;
