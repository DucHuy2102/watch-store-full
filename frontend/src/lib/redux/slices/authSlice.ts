import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, IUser } from '../interfaces/auth.interface';

const initialState: IAuthState = { user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { getUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
