import { all } from 'redux-saga/effects';
import * as JiraClone from './JiraCloneSaga';

export function* rootSaga() {
    yield all([
        JiraClone.theoDoiSigninApiAction()
    ]);
}