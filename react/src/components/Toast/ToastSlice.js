import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toast:{
        type:'',
        title:'',
        status:false
    },
}

export const ToastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers:{
    toastChange:(state,action) => {
        state.toast = action.payload
    }
  }
})



export const {toastChange} = ToastSlice.actions
export default ToastSlice.reducer
