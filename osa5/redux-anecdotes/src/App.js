import React from 'react';


class App extends React.Component {
  onSubmit = (e) => {
  	e.preventDefault();

  	this.props.store.dispatch({
  		type: 'CREATE',
  		data: this.props.store.getState().content
  	});

  	this.props.store.dispatch({
  		type: 'CONTENT',
  		data: ''
  	});
  }

  handleChange = (e) => {
  	this.props.store.dispatch({type: 'CONTENT', data: e.target.value});
  }

  render() {
    const state = this.props.store.getState();

    state.anecdotes.sort((a, b) => {
    	return b.votes - a.votes;
    });

    return (
      <div>
        <h2>Anecdotes</h2>
        {state.anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.props.store.dispatch({type: 'VOTE', data: {id: anecdote.id}})}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.onSubmit}>
          <div><input onChange={this.handleChange} value={state.content} /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App