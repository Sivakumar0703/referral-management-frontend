import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    url: 'https://referral-management-backend.onrender.com/api',
    user:{token:'', isAdmin:false},
    isLoading: false,
    error: null,
};


const userSlice = createSlice({
    name:'user',
    initialState: initialState,
    reducers: {
        // save user data (isAdmin and token)
        saveUserData: (state, action) => {
            console.log('user slice', action.payload)
            state.user = action.payload
        },
    }
});

export default userSlice.reducer;
export const {saveUserData} = userSlice.actions;