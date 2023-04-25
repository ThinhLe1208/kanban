import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
};

const LoadingReducer = createSlice({
    name: 'LoadingReducer',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
        },
        hideLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { showLoading, hideLoading } = LoadingReducer.actions;

export default LoadingReducer.reducer;