import { takeLatest, call, put } from "redux-saga/effects";

import { DELETE_COMMENT_SAGA, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "redux/constants/JiraCloneConst";
import { setCommentList } from "redux/reducers/commentReducer";
import { commentService } from "services/commentService";
import { STATUS_CODE } from "util/constants/settingSystem";
import { showNotification } from "util/notification";
import { getAllCommentSagaAction } from "./actions/commentAction";

function* getAllCommentSaga(action) {
    try {
        const { data, status } = yield call(commentService.getAllCommentService, action.taskId);
        if (status === STATUS_CODE.SUCCESS) {
            yield put(setCommentList(data.content));
        }
    } catch (err) {
        console.error(err);
    }
}

export function* watchGetAllCommentSaga() {
    yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}

function* insertCommentSaga(action) {
    try {
        const { data, status } = yield call(commentService.insertCommentService, action.data);
        if (status === STATUS_CODE.SUCCESS) {
            // call api because cant update the commentList in the store of redux, the response of backend is not same format (not include user property)
            yield put(getAllCommentSagaAction(data.content.taskId));
            showNotification('success', 'Send comment successfully !');
        }
    } catch (err) {
        showNotification('error', 'Send comment fail !');
        console.error(err);
    }
}

export function* watchInsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

function* updateCommentSaga(action) {
    try {
        const { data, status } = yield call(commentService.updateCommentService, action.commentId, action.contentComment);
        if (status === STATUS_CODE.SUCCESS) {
            // call api because cant update the commentList in the store of redux, the response of backend is not same format (not include user property)
            yield put(getAllCommentSagaAction(data.content.taskId));
            showNotification('success', 'Update comment successfully !');
        }
    } catch (err) {
        showNotification('error', 'Update comment fail !');
        console.error(err);
    }
}

export function* watchUpdateCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}

function* deleteCommentSaga(action) {
    try {
        const { status } = yield call(commentService.deleteCommentService, action.commentId);
        if (status === STATUS_CODE.SUCCESS) {
            // call api because cant update the commentList in the store of redux, the response of backend is not same format (not include user property)
            yield put(getAllCommentSagaAction(action.taskId));
            showNotification('success', 'Delete comment successfully !');
        }
    } catch (err) {
        showNotification('error', 'Delete comment fail !');
        console.error(err);
    }
}

export function* watchDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}