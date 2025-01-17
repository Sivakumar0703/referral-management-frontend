import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// async thunk for fetching candidates
export const fetchCandidates = createAsyncThunk('candidates/fetchCandidates', 
    async function(data, thunkApi){
        try {
          const url = 'https://referral-management-backend.onrender.com/api/candidate';
          const token = sessionStorage.getItem('token');
          const getAllCandidates = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
          })
          const response = await getAllCandidates.json();
          return response.candidates;  
        } catch (error) {
            toast.error(error.response?.data.message.toUpperCase());
            return thunkApi.rejectWithValue(error.response?.data.message);
        }
    }
)

