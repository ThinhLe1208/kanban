import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taskTypeList: []
};

const taskTypeReducer = createSlice({
    name: 'taskTypeReducer',
    initialState,
    reducers: {
        setAllTaskType: (state, { payload }) => {
            state.taskTypeList = payload;
        }
    }
});

export const { setAllTaskType } = taskTypeReducer.actions;

export default taskTypeReducer.reducer;