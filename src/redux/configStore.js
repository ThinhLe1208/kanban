import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';

import uiControlReducer from './reducers/uiControlReducer';
import userReducer from './reducers/userReducer';
import projectCategoryReducer from './reducers/projectCategoryReducer';
import projectReducer from './reducers/projectReducer';
import offcanvasReducer from './reducers/offcanvasReducer';
import taskTypeReducer from './reducers/taskTypeReducer';
import priorityReducer from './reducers/priorityReducer';
import statusReducer from './reducers/statusReducer';
import taskReducer from './reducers/taskReducer';
import commentReducer from './reducers/commentReducer';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
export const store = configureStore({
    reducer: {
        userReducer,
        uiControlReducer,
        offcanvasReducer,
        projectCategoryReducer,
        taskTypeReducer,
        priorityReducer,
        statusReducer,
        projectReducer,
        taskReducer,
        commentReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // hide an error when states are components or functions in redux-toolkit store
        serializableCheck: false // works in the app, but doesn't in tests
    }).concat(sagaMiddleware),
});

// then run the saga
sagaMiddleware.run(rootSaga);