import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text}) => {
	return <p>{text}</p>
}

const Votes = ({votes}) => {
	return <p>has {votes || 0} votes</p>
}

const MostVotes = ({anecdote, votes}) => {
	return <div>
		<h3>anecdote with most votes:</h3>
		<p>{anecdote}</p>
		<Votes votes={votes} />
	</div>
}

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selected: 0,
			votes: {}
		}
	}

	componentDidMount() {
		this.randomSelected();
	}

	randomSelected() {
		this.setState((prevState) => {
			let selected;
			do {
				selected = Math.floor(Math.random() * this.props.anecdotes.length);
			} while(prevState.selected === selected);

			return {selected};
		});
	}

	vote() {
		this.setState((prevState) => {
			const votes = prevState.votes,
				s = prevState.selected;

			if(votes[s] === undefined) votes[s] = 0;

			votes[s]++;

			return votes;
		});
	}

	getMostVotes() {
		let most = 0, index = 0;
		for(let key in this.state.votes) {
			if(this.state.votes[key] > most) {
				most = this.state.votes[key];
				index = key;
			}
		}

		return index;
	}

	render() {
		const most = this.getMostVotes();

		return (
			<div>
				<button onClick={this.vote.bind(this)}>vote</button>
				<button onClick={this.randomSelected.bind(this)}>next anecdote</button>
				<Anecdote text={this.props.anecdotes[this.state.selected]} />
				<Votes votes={this.state.votes[this.state.selected]} />
				<MostVotes anecdote={this.props.anecdotes[most]} votes={this.state.votes[most]} />
			</div>
		)
	}
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
