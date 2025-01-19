import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {
        error: null,
    },
    reducers: {
        setErrorState: (state, action) => {
            state.error = action.payload;
        },
        clearErrorState: (state) => {
            state.error = null;
        },
    },
});

export const { setErrorState, clearErrorState } = errorSlice.actions;

export default errorSlice.reducer;
