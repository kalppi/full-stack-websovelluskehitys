import React from 'react';
import { vote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';
import { connect} from 'react-redux';
import Filter from './Filter';

class AnecdoteList extends React.Component {
  onClick = (anecdote) => {
  	this.props.vote(anecdote);
  	this.props.notify(`you voted '${anecdote.content}'`, 5);
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter/>

        {this.props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.onClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
	if(filter !== '') {
		anecdotes = anecdotes.filter(a => a.content.indexOf(filter) !== -1);
	}

	return anecdotes.sort((a, b) => b.votes - a.votes);
};

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
};

const mapDispatchToProps = {
	vote, notify
};

const ConnectedAnecdoteList =
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(AnecdoteList);

export default ConnectedAnecdoteList;
