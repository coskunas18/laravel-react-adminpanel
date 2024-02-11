import { configureStore } from '@reduxjs/toolkit'
import sideBarReducer from "./sideBarSlice"
import usersReducer from "../components/users/UserSlice.js"

export const store = configureStore({
  reducer: {
    sidebar:sideBarReducer,
    users:usersReducer
  },
})
