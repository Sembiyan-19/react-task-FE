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
        case 'ADD_CATEGORY':
            //insertCategory(action.value)
            return {
                ...state, categories: [...state.categories, action.value],
                currentCategory: action.value, 
                categoryCount: state.categoryCount++,
                isCategoriesChanged: true
            }
        case 'SET_CATEGORIES_INITIALLY':
            return {
                ...state, categories: action.value, currentCategory: action.value[0]
            }
        case 'SET_CATEGORIES':
            return {
                ...state, categories: action.value, isCategoriesChanged: false
            }
        case 'SET_CURRENT_CATEGORY':
            return {
                ...state, currentCategory: action.value, isTasksChanged: false
            }
        case 'ADD_TASK':
            return {
                ...state, isTasksChanged: true
            }
        case 'UPDATE_TASK':
            axios.put("http://localhost:8003/tasks/" + action.value._id, action.value)
            return {
                ...state, isTasksChanged: true, isStepsChanged: action.isStepsChanged
            }
        case 'SET_CURRENT_TASK':
            return {
                ...state, currentTask: action.value, isFullwidth: false, isStepsChanged: false
            }
        default: 
            return state;
    }
    
}

let store = createStore(rootReducer);

export default store;