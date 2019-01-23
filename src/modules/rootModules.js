//Core
import { combineReducers } from 'redux';
// Reducer
import { studentsReducer } from './Students/reducer';

export default combineReducers({
    students: studentsReducer,
});
