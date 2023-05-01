import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga/rootSaga';

import loadingReducer from './reducers/loadingReducer';
import userReducer from './reducers/userReducer';
import projectCategoryReducer from './reducers/projectCategoryReducer';
import projectReducer from './reducers/projectReducer';
import drawerReducer from './reducers/drawerReducer';
import taskTypeReducer from './reducers/taskTypeReducer';
import priorityReducer from './reducers/priorityReducer';
import statusReducer from './reducers/statusReducer';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
export const store = configureStore({
    reducer: {
        loadingReducer,
        userReducer,
        projectCategoryReducer,
        projectReducer,
        drawerReducer,
        taskTypeReducer,
        priorityReducer,
        statusReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // hide an error when states are components or functions in redux-toolkit store
        serializableCheck: false // works in the app, but doesn't in tests
    }).concat(sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(rootSaga);