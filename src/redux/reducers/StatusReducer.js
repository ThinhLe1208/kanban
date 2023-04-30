import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    statusList: []
};

const StatusReducer = createSlice({
    name: 'StatusReducer',
    initialState,
    reducers: {
        setStatusList: (state, { payload }) => {
            state.statusList = payload;
        }
    }
});

export const {
    setStatusList
} = StatusReducer.actions;

export default StatusReducer.reducer;