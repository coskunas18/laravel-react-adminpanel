import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarIsOpen:false,
}

export const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers:{
    sideBarToggle:(state) => {
        state.sidebarIsOpen = !state.sidebarIsOpen
    }
  }
})



export const {sideBarToggle} = sideBarSlice.actions
export default sideBarSlice.reducer
