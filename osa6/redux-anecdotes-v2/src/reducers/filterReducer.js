
const reducer = (store = '', action) => {
	if (action.type === 'SET_FILTER') {
		return action.filter;
	} else {
		return store;
	}
};

export const filterSetting = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter
  }
};

export const filterClearing = () => {
	return {
	  type: 'SET_FILTER',
	  filter: ''
	}
};

export default reducer;