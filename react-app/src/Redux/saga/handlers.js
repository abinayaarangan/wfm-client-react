import axios from 'axios'
import { call, put } from 'redux-saga/effects'


export function* loginHandler(action) {
  try {
    let result = yield call(axios.post, "http://localhost:8000/users/signin", action.data)

    localStorage.setItem("username", result.data.username)
    localStorage.setItem("usertype", result.data.usertype)
    localStorage.setItem("token", result.data.token)

    yield put({
      type: "LOGIN_SUCCESS", data:
      {
        username: result.data.username,
        usertype: result.data.usertype,
        token: result.data.token
      }
    })
  }
  catch (e) {
    yield put({ type: "LOGIN_FAILURE" })
  }

}


export function* managerHandler(action) {
  try {
    let man = localStorage.getItem("username")
    man = { manager: man };
    let result = yield call(axios.post, "http://localhost:8000/users/manager", man)

    yield put({ type: "LOAD_EMPLOYEE", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }

}

export function* wfm_ManagerHandler(action) {
  try {
    let wfm_man = localStorage.getItem("username")
    wfm_man = { wfm_manager: wfm_man };
    let result = yield call(axios.post, "http://localhost:8000/users/getwfmManager", wfm_man)


    yield put({ type: "LOAD_WFM_MANAGER", data: result.data })
  }
  catch (e) {
    yield put({ type: "FAILURE" })
  }
}

export function* managerUpdateHandler(action) {
  try {
   
    let emp_data = { employee_id: action.data.employee_id,manager : action.data.manager, requestMessage: action.data.requestMessage  };
 
    let result = yield call(axios.post, "http://localhost:8000/users/updateEmployeeStatus", emp_data)
  

    // yield put({ type: "LOAD_WFM_MANAGER", data: result.data })
  }
  catch (e) {
    // yield put({ type: "FAILURE" })
  }
}


export function* wfm_managerUpdateHandler(action) {
  try {
  
    let emp_data = { employee_id: action.data.employee_id,status : action.data.status, lockid: action.data.lockid  };
   
    let result = yield call(axios.post, "http://localhost:8000/users/validateManagerRequest", emp_data)
   

     yield put({ type: "WFM_MANAGER_SUCCESS", data: result.data })
  }
  catch (e) {
    // yield put({ type: "FAILURE" })
  }

}