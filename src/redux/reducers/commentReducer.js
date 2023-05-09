import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    commentList: []
};

const commentReducer = createSlice({
    name: 'commentReducer',
    initialState,
    reducers: {
        setCommentList: (state, { payload }) => {
            state.commentList = payload;
        },
    }
});

export const {
    setCommentList,
} = commentReducer.actions;

export default commentReducer.reducer;