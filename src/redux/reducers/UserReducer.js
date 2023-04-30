import { createSlice } from '@reduxjs/toolkit';
import { CURRENT_USER } from 'util/constants/settingSystem';

let currentUser = {};
if (localStorage.getItem(CURRENT_USER)) {
    currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
}

const initialState = {
    currentUser,
    getUser: [],
    getUserByProjectId: []
};

const UserReducer = createSlice({
    name: 'UserReducer',
    initialState,
    reducers: {
        userSignin: (state, { payload }) => {
            state.currentUser = payload;
        },
        getUser: (state, { payload }) => {
            state.getUser = payload;
        },
        getUserByProjectId: (state, { payload }) => {
            state.getUserByProjectId = payload;
        }
    }
});

export const {
    userSignin,
    getUser,
    getUserByProjectId
} = UserReducer.actions;

export default UserReducer.reducer;