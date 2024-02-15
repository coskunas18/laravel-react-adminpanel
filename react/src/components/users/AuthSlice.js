import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axios";

const initialState = {
    loading:false,
    currentUser:{},
    authToken:localStorage.getItem('TOKEN') || '',
    errors:null,

}



export const authLogin = createAsyncThunk('auth/authLogin',async(credentials)=>{
    try {
    const request = await axiosClient.post(`/login`,credentials);
       return request.data;
    } catch (err) {
           return err.response.data // Sunucudan dönen hata mesajı
    }

})

export const authLogout = createAsyncThunk('auth/authLogout',async()=>{
    try {
        await axiosClient.post(`/logout`);
        return;
    } catch (err) {
        console.log(err)
    }

})

export const authSignUp = createAsyncThunk('auth/authSignUp',async(credentials)=>{

    try {
        const request = await axiosClient.post(`/signup`,credentials);
        return request.data;
    } catch (err) {
        return err.response.data // Sunucudan dönen hata mesajı
    }

  })

  export const authCurrentUser = createAsyncThunk('auth/authCurrentUser',async()=>{
        const request = await axiosClient.get(`/me`);
        return request.data;
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
            state.errors = null
        })
        .addCase(authLogin.fulfilled,(state,action)=>{
            state.loading = false;

           if(action.payload?.errors){
                state.errors = action.payload.errors
            }

            //set token
            if (action.payload?.token && action.payload?.user ) {
                state.authToken = action.payload.token;
                if (state.authToken != null) {
                    localStorage.setItem('TOKEN',state.authToken);
                }else{
                    localStorage.removeItem('TOKEN');
                    console.log(state.authToken);
                }
               //set token

               state.currentUser = action.payload.user;
            }
        })
        .addCase(authLogout.pending,(state)=>{
            state.loading = true;
            state.user = null,
            state.errors = null
        })
        .addCase(authLogout.fulfilled,(state)=>{
            state.loading = false;
            state.user = null;
            state.authToken=null;
            if (state.authToken != null) {
                localStorage.setItem('TOKEN',state.authToken);
            }else{
                localStorage.removeItem('TOKEN');
            }
        })
        .addCase(authSignUp.pending,(state)=>{
            state.loading = true;
            state.user = null,
            state.errors = null
        })
        .addCase(authSignUp.fulfilled,(state,action)=>{
            state.loading = false;

            if(action.payload?.errors){
                state.errors = action.payload.errors
            }

            //set token
         if (action.payload?.token && action.payload?.user ) {
            state.authToken = action.payload.token;
            if (state.authToken != null) {
                localStorage.setItem('TOKEN',state.authToken);
            }else{
                localStorage.removeItem('TOKEN');
            }
           //set token
           state.currentUser = action.payload.user;
          }
        })
        .addCase(authCurrentUser.pending,(state)=>{
            state.loading = true;
            state.currentUser = null,
            state.errors = null
        })
        .addCase(authCurrentUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.currentUser = action.payload,
            state.errors = null
        })
    }
});

export const {setAuthToken,setCurrentUser} = authSlice.actions;

export default authSlice.reducer
