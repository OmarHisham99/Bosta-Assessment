import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchShipById = createAsyncThunk('Ships/fetchShips', async (id,thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.get(`https://tracking.bosta.co/shipments/track/${id}`)
        const data = res.data;
        return data;
    }
    catch(err){
        return {}
    }
})


const shipsSlice = createSlice({
    name:'Ships', 
    initialState:{
        data:{}
    },
    extraReducers:{
        [fetchShipById.fulfilled]:(state,action) => {
            state.data = action.payload;
        },
    }
})

export default shipsSlice.reducer 