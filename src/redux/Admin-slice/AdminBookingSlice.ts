import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IBookRoom } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'

export interface IUserState {
    listBooking: IBookRoom[]
}

export const getListBookedRoom = createAsyncThunk(
    'adminSlice/getBookingByPhanTrang',
    async () => {
        try {
            const resp = await
            axiosInterceptorWithCybertoken.get('/api/dat-phong')
            return resp.data.content;
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState: IUserState = {
    listBooking: []
}

export const adminBookingSlice = createSlice({
    name: 'adminBookingSlice',
    initialState,
    reducers: {

    },
    extraReducers: (build) => {
        build.addCase(getListBookedRoom.fulfilled, (state, action) => {
            state.listBooking = action.payload;
        })
    }
})

export default adminBookingSlice.reducer