import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room",
    initialState: {
        roomId: null,
        isOwner: false,
        roomMembers: [],
    },
    reducers: {
        setRoom: (state, actions) => {
            state.roomId = actions.payload;
        },
        deleteRoom: (state) => {
            state.roomId = null;
            state.isOwner = false;
            state.roomMembers = [];
        },
        addMember: (state, actions) => {
            state.roomMembers.push(actions.payload);
        },
        removeMember: (state, actions) => {
            state.roomMembers = state.roomMembers.filter((member) => member !== actions.payload);
        },
        replaceMembers: (state, actions) => {
            state.roomMembers = actions.payload;
        },
        setOwner: (state, actions) => {
            state.isOwner = actions.payload;
        },
    },
});

export const { setRoom, deleteRoom, addMember, removeMember, setOwner, replaceMembers } = roomSlice.actions;

export default roomSlice.reducer;
