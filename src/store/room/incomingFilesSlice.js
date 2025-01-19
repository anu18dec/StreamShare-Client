import { createSlice } from "@reduxjs/toolkit";

const incomingFileSlice = createSlice({
    name: "incomingFiles",
    initialState: {
        files: {},
    },
    reducers: {
        addIncomingFile: (state, actions) => {
            state.files[actions.payload.id] = actions.payload;
        },
        clearFilesState: (state) => {
            state.files = {};
        },
    },
});

export const { addIncomingFile, clearFilesState } = incomingFileSlice.actions;

export default incomingFileSlice.reducer;
