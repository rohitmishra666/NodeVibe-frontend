import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
    accessToken: null,
    refreshToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.status = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userData = action.payload.user;
        },
        logout(state) {
            state.status = false;
            state.userData = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        updateUser(state, action){
            state.userData = action.payload;
        }
    }
})

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;