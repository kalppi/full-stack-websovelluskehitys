import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';
import loginReducer from './reducers/loginReducer';

const reducer = combineReducers({
	notification: notificationReducer,
	blogs: blogsReducer,
	users: usersReducer,
	loggedIn: loginReducer
});

const store = createStore(
	reducer,
	applyMiddleware(thunk)
);

export default store