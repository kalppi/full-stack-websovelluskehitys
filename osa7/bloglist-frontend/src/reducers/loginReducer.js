import loginService from '../services/login';
import { setToken } from '../services/blogs';

const reducer = (store = null, action) => {
	switch(action.type) {
	case 'LOGGED_IN_SET':
		return action.data.user;
	default:
		return store;
	}
};

export const loadLoggedInUser = () => {
	return async (dispatch) => {
		const userJSON = window.localStorage.getItem('user');

		if(userJSON) {
			const user = JSON.parse(userJSON);

			setToken(user.token);

			dispatch({
				type: 'LOGGED_IN_SET',
				data: { user }
			});
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		window.localStorage.removeItem('user');

		dispatch({
			type: 'LOGGED_IN_SET',
			data: { user: null}
		})
	};
};

export const login = (username, password) => {
	return async (dispatch) => {
		const user = await loginService.login({
			username: username,
			password: password
		})

		window.localStorage.setItem('user', JSON.stringify(user));
		setToken(user.token);

		dispatch({
			type: 'LOGGED_IN_SET',
			data: { user }
		});
	};
};

export default reducer;