import { createSlice } from "@reduxjs/toolkit"
import { fetchCandidates } from "./asyncThunk";

let initialState = {
    url: 'https://referral-management-backend.onrender.com/api',
    candidates:[],
    isLoading: false,
    error: null,
    isAdmin: false
};


const candidateSlice = createSlice({
    name:'candidates',
    initialState: initialState,
    reducers: {
        // update candidate job status
        updateJobStatus: (state, action) => {
            return {...state}
        },

        // filter by job status and title
        filterCandidates: (state, action) => {
            state.candidates = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchCandidates.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchCandidates.fulfilled, (state, action) => {
            state.candidates = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchCandidates.rejected , (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

export default candidateSlice.reducer;
export const {updateJobStatus, filterCandidates} = candidateSlice.actions;