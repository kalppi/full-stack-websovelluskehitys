import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import Statistiikka from './Statistiikka';
import counterReducer from './reducer.js';

const store = createStore(counterReducer);

class App extends React.Component {
	render() {
		return (
			<div>
			<h2>anna palautetta</h2>
			<button onClick={e => store.dispatch({type: 'GOOD'})}>hyvä</button>
			<button onClick={e => store.dispatch({type: 'OK'})}>neutraali</button>
			<button onClick={e => store.dispatch({type: 'BAD'})}>huono</button>
			<Statistiikka stats={store.getState()} />
			</div>
		);
	}
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
