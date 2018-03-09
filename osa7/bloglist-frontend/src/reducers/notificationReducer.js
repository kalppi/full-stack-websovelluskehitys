
const reducer = (store = '', action) => {
	if (action.type === 'SET_NOTIFICATION') {
		return action.message;
	} else {
		return store;
	}
};


let timeout = null;

export const notify = (message, s) => {
	return async (dispatch) => {
		dispatch({
			type: 'SET_NOTIFICATION',
			message: message
		});

		clearTimeout(timeout);

		timeout = setTimeout(() => {
			dispatch({
				type: 'SET_NOTIFICATION',
				message: ''
			});
		}, s * 1000);
	}
}

export default reducer;