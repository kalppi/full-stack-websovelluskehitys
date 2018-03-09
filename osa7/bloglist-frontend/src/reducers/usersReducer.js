import userService from '../services/users';

const reducer = (store = [], action) => {
	switch(action.type) {
	case 'USERS_INIT':
		return action.data;
	default:
		return store;
	}
};

export const initUsers = () => {
	return async (dispatch) => {
		const users = await userService.getAll();

		dispatch({
			type: 'USERS_INIT',
			data: users
		});
	};
};

export default reducer;