import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    drawerContent: <p>Empty</p>,
    handleSubmitDrawer: () => {
        console.log('default');
    }
};

const DrawerReducer = createSlice({
    name: 'DrawerReducer',
    initialState,
    reducers: {
        showDrawer: (state) => {
            state.isOpen = true;
        },
        hideDrawer: (state) => {
            state.isOpen = false;
        },
        setDrawer: (state, { payload }) => {
            state.drawerContent = payload;
            state.isOpen = true;
        },
        setHandleSubmitDrawer: (state, { payload }) => {
            state.handleSubmitDrawer = payload;
        }
    }
});

export const {
    showDrawer,
    hideDrawer,
    setDrawer,
    setHandleSubmitDrawer
} = DrawerReducer.actions;

export default DrawerReducer.reducer;