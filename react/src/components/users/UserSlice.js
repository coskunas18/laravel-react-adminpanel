import { createSlice,createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const usersAdapter = createEntityAdapter()
const initialState =  usersAdapter.getInitialState({
    status:'idle',
    error:null,
    currentPage:1,
    perPage:10,
    meta:'',
    links:'',
    searching:'',

});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ({page,pageSize,search}) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/users?page=${page}&pageSize=${pageSize}&search=${search}`);
        const { data, meta, links } = response.data;
        return { data, meta, links };
    } catch (error) {
       return error.message
    }
})


export const addNewUser = createAsyncThunk('posts/addNewUser', async (initialPost) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/users`,initialPost);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
})

export const updateUser = createAsyncThunk('users/updateUsers', async(initialUser) => {
    const {id} = initialUser;

    try {
        const response = await axios.put(`http://localhost:8000/api/users/${id}`,initialUser)
        return response.data;

    } catch (error) {
        return error.response.data.errors
    }
})


export const deleteUser = createAsyncThunk('users/deleteUsers', async(initialUser) => {
    const {id} = initialUser;

    try {
        const response = await axios.delete(`http://localhost:8000/api/users/${id}`,initialUser)
        if (response?.status === 204) return initialUser;

    } catch (error) {
        return error.response.data.errors
    }
})



export const UsersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        onNextPage: (state) => {
            state.currentPage++;
            state.status = "idle"
        },
        onPrevPage: (state) => {
            state.currentPage--;
            state.status = "idle"
        },
        onClickLastPage: (state) => {
            state.currentPage = state.meta.last_page;
            state.status = "idle"
        },
        onClickBeginingPage: (state) => {
            state.currentPage = 1;
            state.status = "idle"
        },
        onChangePerPage: (state,action) => {
            state.perPage = action.payload
            state.status = "idle"
        },
        onChangeSearch: (state,action) => {
             state.searching = action.payload
        },
        onChangeStatus:(state,action) => {
            state.status = action.payload
        },
        onChangeError:(state,action) => {
            state.error = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending,(state) => {
            state.status = "loading";
        })
        .addCase(fetchUsers.fulfilled, (state,action) => {
        state.status = 'success';
        const { data, meta, links } = action.payload;
        usersAdapter.setAll(state, data);
        state.meta = meta;
        state.links = links;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewUser.fulfilled,(state,action) => {

            if (!action.payload?.data) {
                state.error = action.payload.errors
                return;
            }else{
                state.status = "idle"
                state.error = null
                usersAdapter.addOne(state,action.payload.data)
            }

        })
        .addCase(updateUser.fulfilled,(state,action) => {
            if (!action.payload.data?.id) {
                console.log('Update could not complete')
                state.error = action.payload
                return;
            }else{
                state.status = "idle"
                state.error = null
                usersAdapter.upsertOne(state,action.payload.data);
            }

        }). addCase(deleteUser.fulfilled,(state,action) => {
            if (!action.payload?.id) {
                console.log('Delete could not complete')
                console.log(action.payload)
                return;
            }
            const {id} = action.payload;
            usersAdapter.removeOne(state,id)
        })
    }
})


export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors((state) => state.users)

//export const selectAllUsers = (state) => state.users.users; //useSelector kullanırken direkt olarak selecAllUsers çağırılacak
export const getUserStatus = (state) => state.users.status;
export const getUserMeta = (state) => state.users.meta;
export const getUserLinks = (state) => state.users.links;
export const getUserCurrentPage = (state) => state.users.currentPage;
export const getUserPerPage = (state) => state.users.perPage;
export const getUserSearch = (state) => state.users.searching;
export const getUserError = (state) => state.users.error;
export const {
    onNextPage,
    onPrevPage,
    onClickLastPage,
    onClickBeginingPage,
    onChangePerPage,
    onChangeSearch,
    onChangeStatus,
    onChangeError,
} = UsersSlice.actions;

export default UsersSlice.reducer;


