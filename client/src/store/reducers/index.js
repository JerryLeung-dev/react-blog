import { combineReducers } from 'redux';
import user from './users_reducers';
import chats from './chat_reducers';

const rootReducer = combineReducers({
    user,
    chats
})

export default rootReducer