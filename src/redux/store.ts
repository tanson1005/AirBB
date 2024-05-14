import { configureStore } from '@reduxjs/toolkit'
import sliceLocation from './Location-slice/LocationSlice'
import sliceUser from './user-slice/UserSlice'
import sliceRoomDetail from './Detail-slice/DetailSlice'

export const store = configureStore({
  reducer: {
    sliceLocation,
    sliceUser,
    sliceRoomDetail,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch