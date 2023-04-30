import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    priorityList: []
};

const PriorityReducer = createSlice({
    name: 'PriorityReducer',
    initialState,
    reducers: {
        setPriorityList: (state, { payload }) => {
            state.priorityList = payload;
        }
    }
});

export const { setPriorityList } = PriorityReducer.actions;

export default PriorityReducer.reducer;