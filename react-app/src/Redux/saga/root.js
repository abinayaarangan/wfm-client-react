import {takeEvery} from 'redux-saga/effects'
import { loginHandler,managerHandler,wfm_ManagerHandler,managerUpdateHandler,wfm_managerUpdateHandler} from './handlers'


export function* rootSaga(){
    yield takeEvery("LOGIN_ACTION",loginHandler)
    yield takeEvery("MANAGER_ACTION",managerHandler)
    yield takeEvery("SEND_REQUEST",managerUpdateHandler)
    yield takeEvery("WFM_MANAGER_ACTION",wfm_ManagerHandler)
    yield takeEvery("WFM_REQUEST_ACTION",wfm_managerUpdateHandler)
}