import { configureStore } from '@reduxjs/toolkit'
import sideBarReducer from "./sideBarSlice"
import usersReducer from "../components/users/UserSlice.js"
import authReducer from "../components/users/AuthSlice.js"
import toastReducer from '../components/Toast/ToastSlice.js'
export const store = configureStore({
  reducer: {
    sidebar:sideBarReducer,
    users:usersReducer,
    auth:authReducer,
    toast:toastReducer
  },
})
