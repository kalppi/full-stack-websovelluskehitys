import React from 'react';
import { notify } from '../reducers/notificationReducer';
import { createNew } from '../reducers/anecdoteReducer';
import { connect} from 'react-redux';

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    this.props.createNew(content);
  
    e.target.anecdote.value = ''

  	this.props.notify(`you created '${content}'`, 5);
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
};

const mapDispatchToProps = {
	notify, createNew
};


const ConnectedAnecdoteForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteForm);


export default ConnectedAnecdoteForm;
