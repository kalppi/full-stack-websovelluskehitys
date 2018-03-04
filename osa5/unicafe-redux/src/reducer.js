const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  const newState = {
  	good: state.good,
  	ok: state.ok,
  	bad: state.bad
  };
  
  switch (action.type) {
    case 'GOOD':
    	newState.good++;
      return newState
    case 'OK':
      newState.ok++;
      return newState
    case 'BAD':
      newState.bad++;
      return newState
    case 'ZERO':
      return newState
  }
  return newState
}

export default counterReducer;