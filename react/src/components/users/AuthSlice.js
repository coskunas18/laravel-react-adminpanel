import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios";

const initialState = {
    loading:false,
    currentUser:null,
    authToken:localStorage.getItem('TOKEN') || '',
    error:null,

}



export const authLogin = createAsyncThunk('auth/authLogin',async(credentials)=>{
    const request = await axiosClient.post(`/login`,credentials);
    return request.data
})

export const authLogout = createAsyncThunk('auth/authLogout',async()=>{
    const request = await axiosClient.post(`/logout`);
    return request.data
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuthToken:(state,action) => {
            state.authToken = action.payload;
            if (state.authToken != null) {
                localStorage.setItem('TOKEN',state.authToken);
            }else{
                localStorage.removeItem('TOKEN');
                console.log(state.authToken);
            }
        },
        setCurrentUser:(state,action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(authLogin.pending,(state)=> {
            state.loading = true;
            state.user = null,
            state.error = null
        })
        .addCase(authLogin.fulfilled,(state,action)=>{
            state.loading = false;
            //set token
            state.authToken = action.payload.token;
            if (state.authToken != null) {
                localStorage.setItem('TOKEN',state.authToken);
            }else{
                localStorage.removeItem('TOKEN');
                console.log(state.authToken);
            }
           //set token
           state.currentUser = action.payload.user;
        })
        .addCase(authLogin.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            console.log(action)
        })
        .addCase(authLogin.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            console.log(action)
        })

    }
});

export const {setAuthToken,setCurrentUser} = authSlice.actions;

export default authSlice.reducer
