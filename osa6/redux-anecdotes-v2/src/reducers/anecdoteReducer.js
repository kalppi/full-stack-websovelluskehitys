import anecdoteService from '../services/anecdotes';

const reducer = (store = [], action) => {
  switch(action.type) {
  	case 'INIT':
  		return action.data;
  	case 'VOTE':
	  	const old = store.filter(a => a.id !== action.data.id)
	  	const voted = store.find(a => a.id === action.data.id)

	  	voted.votes++;

	  	return [...old, { ...voted } ];
	 case 'CREATE':
	 	return [...store, action.data]
	 default:
  }

  return store;
}

export const createNew = (content) => {
  return async (dispatch) => {
  	const obj = {
  		content: content,
  		votes:0
  	};

    const newAneddote = await anecdoteService.create(obj)
    dispatch({
      type: 'CREATE',
      data: newAneddote
    })
  }
}

export const vote = (anecdote) => {
	return async (dispatch) => {
		await anecdoteService.update(
			anecdote.id, { ...anecdote, votes: anecdote.votes + 1 }
		);

		dispatch({
			type: 'VOTE',
			data: anecdote
		})
	}
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
};


export default reducer