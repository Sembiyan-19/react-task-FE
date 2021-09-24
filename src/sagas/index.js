import { watchGetCategories } from './categories'
import { all } from 'redux-saga/effects';

function* rootSaga () {
    yield all ([
        watchGetCategories()
    ])
}

export default rootSaga;