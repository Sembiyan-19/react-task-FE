import { takeEvery, call, put } from 'redux-saga/effects';
import Axios from 'axios'

export const watchGetCategories = function*() {
    yield takeEvery("GET_CATEGORIES", workerGetCategories)
    yield takeEvery("UPDATE_CATEGORIES", workerUpdateCategories)
    yield takeEvery("UPDATE_TASK", workerUpdateTasks)
    yield takeEvery("ADD_TASK", workerAddTask)
    yield takeEvery("UPDATE_STEP", workerAddStep)
}

function* workerGetCategories(): any {
    const res: any = yield call(Axios.get, "http://localhost:8003/categories");
    yield put({type: "SET_CATEGORIES_INITIALLY", value: res.data.data})
}

function* workerUpdateCategories(action: any): any {
    const createdObject: any = yield call(Axios.post, "http://localhost:8003/categories", action.value);
    const res: any = yield call(Axios.get, "http://localhost:8003/categories");
    yield put({type: "SET_CATEGORIES", value: res.data.data, currentCategory: createdObject.data})
}


function* workerAddTask(action: any): any {
    yield call(Axios.post, "http://localhost:8003/tasks", action.value)
    const createdObject: any = yield call(Axios.get, "http://localhost:8003/categories/" + action.id)
    yield put({type: "SET_CURRENT_CATEGORY", value: createdObject.data, isFullWidth: false})
}

function* workerUpdateTasks(action: any): any {
    const res: any = yield call(Axios.put, "http://localhost:8003/tasks/" + action.value._id, action.value)
    const createdObject: any = yield call(Axios.get, "http://localhost:8003/categories/" + action.id)
    yield put({type: "UPDATE_CURRENT_CATEGORY", currentTask: res.data, value: createdObject.data, isFullWidth: action.isFullWidth})
}

function* workerAddStep(action: any): any {
    yield call(Axios.put, "http://localhost:8003/tasks/" + action.value._id, action.value)
    const createdObject: any = yield call(Axios.get, "http://localhost:8003/tasks/" + action.value._id)
    yield put({type: "SET_CURRENT_TASK", value: createdObject.data})
}



