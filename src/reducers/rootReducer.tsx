import axios from 'axios';
import { createStore } from 'redux';
import redux from 'redux'

const initialState = {
    isLoaded: true,
    isCategoriesChanged: false,
    isTasksChanged: false,
    isStepsChanged: false,
    isFullwidth: true,
    categories:  [{}],
    currentCategory: {},
    currentTask: {},
    categoryCount: 1
}


const rootReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_CATEGORIES_INITIALLY':
            return {
                ...state, categories: action.value, currentCategory: action.value[0]
            }
        case 'SET_CATEGORIES':
            return {
                ...state, categories: action.value, categoryCount: state.categoryCount++, 
                currentCategory: action.currentCategory
            }
        case 'SET_CURRENT_CATEGORY':
            return {
                ...state, currentCategory: action.value, isFullwidth: action.isFullWidth
            }
        case 'UPDATE_CURRENT_CATEGORY':
            return {
                ...state, currentCategory: action.value, 
                isFullwidth: action.isFullWidth,
                currentTask: action.currentTask
            }
        case 'SET_CURRENT_TASK':
            return {
                ...state, currentTask: action.value, isFullwidth: false,
            }
        default: 
            return state;
    }
    
}

//let store = createStore(rootReducer);

export default rootReducer;