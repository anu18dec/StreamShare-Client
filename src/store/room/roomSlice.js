import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room",
    initialState: {
        roomId: null,
    },
    reducers: {
        setRoom: (state, actions) => {
            state.roomId = actions.payload;
        },
        deleteRoom: (state) => {
            state.roomId = null;
        },
    },
});

export const { setRoom, deleteRoom } = roomSlice.actions;

export default roomSlice.reducer;
