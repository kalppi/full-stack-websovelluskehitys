import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({onClick, value, text}) => {
	return <button onClick={onClick(value)}>{text}</button>
}

const Links = ({onClick}) => {
	return <ul id="feedback">
		<li><Button onClick={onClick} value="good" text="Hyvä" /></li>
		<li><Button onClick={onClick} value="neutral" text="Neutraali" /></li>
		<li><Button onClick={onClick} value="bad" text="Huono" /></li>
	</ul>
}

const Statistic = ({text, value}) => {
	return <tr>
		<td>{text}</td><td>{value}</td>
	</tr>
}

const Statistics = ({stats}) => {
	if(stats.good === 0 && stats.neutral === 0 && stats.bad === 0) {
		return <p>yhtään palautetta ei ole annettu</p>
	}

	const {good, neutral, bad} = stats,
		avg = (good + (-bad)) / (good + neutral + bad),
		positive = good / (good + neutral + bad) * 100;

	return <table>
			<tbody>
				<Statistic text="hyvä" value={good} />
				<Statistic text="neutraaali" value={neutral} />
				<Statistic text="huono" value={bad} />
				<Statistic text="keskiarvo" value={avg.toFixed(2)} />
				<Statistic text="positiivisia" value={Math.round(positive) + '%'} />
			</tbody>
		</table>
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			feedbackGiven: false,
			stats: {
				good: 0,
				neutral: 0,
				bad: 0
			}
		}
	}

	giveFeedback(type) {
		return () => {
			this.setState((prevState) => {
				const stats = prevState.stats;
				stats[type] = prevState.stats[type] + 1;

				return {stats: stats};
			});
		}
	}

	render() {
		return <div>
			<h2>anna palautetta</h2>
			<Links onClick={this.giveFeedback.bind(this)}/>
			<h2>statistiikka</h2>
			<Statistics stats={this.state.stats} />
		</div>
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
