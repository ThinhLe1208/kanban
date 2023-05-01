import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    priorityList: []
};

const priorityReducer = createSlice({
    name: 'priorityReducer',
    initialState,
    reducers: {
        setPriorityList: (state, { payload }) => {
            state.priorityList = payload;
        }
    }
});

export const { setPriorityList } = priorityReducer.actions;

export default priorityReducer.reducer;