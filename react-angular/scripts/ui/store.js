import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from '../reducers/UserReducer';
import postsReducer from '../reducers/PostsReducer';

const combinedReducer = combineReducers({
    user: userReducer,
    posts: postsReducer
});

const store = createStore(combinedReducer, {}, applyMiddleware(thunkMiddleware));

export default store;