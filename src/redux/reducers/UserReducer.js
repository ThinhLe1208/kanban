import { createSlice } from '@reduxjs/toolkit';
import { CURRENT_USER } from '../../util/constants/settingSystem';

let currentUser = {};
if (localStorage.getItem(CURRENT_USER)) {
    currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
}

const initialState = {
    currentUser
};

const UserReducer = createSlice({
    name: 'UserReducer',
    initialState,
    reducers: {
        userLogin: (state, { payload }) => {
            state.currentUser = payload;
        }
    }
});

export const { userLogin } = UserReducer.actions;

export default UserReducer.reducer;