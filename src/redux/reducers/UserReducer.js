import { createSlice } from '@reduxjs/toolkit';
import { CURRENT_USER } from 'util/constants/settingSystem';

let currentUser = {};
if (localStorage.getItem(CURRENT_USER)) {
    currentUser = JSON.parse(localStorage.getItem(CURRENT_USER));
}

const initialState = {
    currentUser,
    getUser: [],
    getUserByProjectId: [],
};

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setCurrentUser: (state, { payload }) => {
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
    setCurrentUser,
    getUser,
    getUserByProjectId
} = userReducer.actions;

export default userReducer.reducer;