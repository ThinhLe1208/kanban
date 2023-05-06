import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    title: 'Default title',
    icon: null,
    aceptBtn: 'Default button',
    showBtn: true,
    offcanvasContent: <p>Empty</p>,
    handleSubmitOffcanvas: () => {
        console.warning('Default handleSubmitOffcanvas');
    }
};

const offcanvasReducer = createSlice({
    name: 'offcanvasReducer',
    initialState,
    reducers: {
        showOffcanvas: (state) => {
            state.isOpen = true;
        },
        hideOffcanvas: (state) => {
            state.isOpen = false;
        },
        setOffcanvas: (state, { payload }) => {
            state.title = payload.title;
            state.icon = payload.icon;
            state.offcanvasContent = payload.offcanvasContent;
            state.aceptBtn = payload.aceptBtn;
            state.showBtn = payload.showBtn;
            state.isOpen = true;
        },
        setHandleSubmitOffcanvas: (state, { payload }) => {
            state.handleSubmitOffcanvas = payload;
        }
    }
});

export const {
    showOffcanvas,
    hideOffcanvas,
    setOffcanvas,
    setHandleSubmitOffcanvas
} = offcanvasReducer.actions;

export default offcanvasReducer.reducer;