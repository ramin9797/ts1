import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUser} from "../../models/iUser";

interface IUserState {
    user: IUser | null,
    accessToken:string | null,
    refreshToken:string | null;
}

const initialState: IUserState = {
    user: null,
    accessToken:null,
    refreshToken:null
};

export const authSlice = createSlice({
    initialState,
    name:"authSlice",
    reducers:{
        logout: ()=>initialState,
        setUser: (state,action:PayloadAction<IUser>)=>{
            state.user = action.payload;
        },
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
        },
    }
})

export default authSlice.reducer;

export const { logout, setUser,setTokens,clearTokens, } = authSlice.actions;
export const userActions = authSlice.actions
export const authReducer = authSlice.reducer
