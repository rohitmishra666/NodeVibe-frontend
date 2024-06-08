import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.status = true;
            localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken));
            localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken));
            state.userData = action.payload.user;
        },
        logout(state) {
            state.status = false;
            state.userData = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        updateUser(state, action){
            state.status = true;
            state.userData = action.payload;
        }
    }
})

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;