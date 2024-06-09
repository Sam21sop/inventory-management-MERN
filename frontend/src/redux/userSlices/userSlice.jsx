import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApiHandler, logoutUserApiHandler, registerUserApiHandler, updateUserApiHandler } from "./userAPI";


export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, thunkAPI) => {
        try {
            return await registerUserApiHandler(userData)
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, thunkAPI) => {
        try {
            return await loginUserApiHandler(userData);
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            return await logoutUserApiHandler();
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const updateUser = createAsyncThunk(
    'user/update',
    async (userData, thunkAPI) => {
        try {
            return await updateUserApiHandler(userData);
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// define initial state
const initialState = {
    isLoggedIn: false,
    isLogoutModalOpen: false,
    user: null,
    loading: false,
    error: null
};


// user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // dispaly logout modal
        toggleLogoutModal: (state, action) => {
            state.isLogoutModalOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // register user
            .addCase(registerUser.pending, (state, action) => { 
                state.loading = true;
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => { 
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => { 
                state.user = null;
                state.error = action.payload;
            })

            // login user
            .addCase(loginUser.pending, (state, action) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => { 
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => { 
                state.user = null;
                state.error = action.payload;
            })

            // update user
            .addCase(updateUser.pending, (state, action) => { 
                state.loading = true;
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action) => { 
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => { 
                state.user = null;
                state.error = action.payload;
            })

            // logout user
            .addCase(logoutUser.pending, (state, action) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => { 
                state.loading = false;
                state.user = null;
                state.isLoggedIn = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => { 
                state.user = null;
                state.error = action.payload;
            })
    }
});


// extract and export action creater by name
export const {toggleLogoutModal } = userSlice.actions;

// export selection for state
export const userSelector = (state) => state.user;

// export reducer
const userReducer = userSlice.reducer;
export default userReducer;