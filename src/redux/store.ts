import { configureStore } from '@reduxjs/toolkit'
import sliceLocation from './Location-slice/LocationSlice'
import sliceUser from './user-slice/UserSlice'
import sliceRoomDetail from './Detail-slice/DetailSlice'
import sliceComment from './Comment-slice/CommentSlice'
import sliceBookingAdmin from './Admin-slice/AdminBookingSlice'

export const store = configureStore({
  reducer: {
    sliceLocation,
    sliceUser,
    sliceRoomDetail,
    sliceComment,
    sliceBookingAdmin,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch