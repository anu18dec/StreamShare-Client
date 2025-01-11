import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userName: null,
    },
    reducers: {
        setUserName: (state, actions) => {
            state.userName = actions.payload;
        },
        deleteUserName: (state) => {
            state.userName = null;
        },
    },
});

export const { setUserName, deleteUserName } = authSlice.actions;

export default authSlice.reducer;
