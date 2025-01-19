import { createSlice } from "@reduxjs/toolkit";

const roomMembersSlice = createSlice({
    name: "room",
    initialState: {
        isOwner: false,
        memberList: [],
    },
    reducers: {
        deleteRoomMembers: (state) => {
            state.isOwner = false;
            state.memberList = [];
        },
        addMember: (state, actions) => {
            state.memberList.push(actions.payload);
        },
        removeMember: (state, actions) => {
            state.memberList = state.memberList.filter((member) => member !== actions.payload);
        },
        replaceMembers: (state, actions) => {
            state.memberList = actions.payload;
        },
        setOwner: (state, actions) => {
            state.isOwner = actions.payload;
        },
    },
});

export const { deleteRoomMembers, addMember, removeMember, setOwner, replaceMembers } = roomMembersSlice.actions;

export default roomMembersSlice.reducer;
