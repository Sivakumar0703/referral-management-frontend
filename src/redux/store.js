import { configureStore } from "@reduxjs/toolkit"
import candidateSlice from "./candidateSlice"
import userSlice from "./userSlice"

const store = configureStore({
    reducer: {
        candidateReducer: candidateSlice,
        userReducer: userSlice
    }
})

export default store