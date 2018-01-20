import React, { Component } from 'react';
import Search from './components/search.js';
import Notification from './components/notification';
import Countries from './components/countries';
import countriesService from './services/countries';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
			notification: '',
			countries: [],
			viewCountry: null
		}
	}

	handleSearchChange(e) {
		this.setState({notification: '', viewCountry: null, countries: []});

		const search = e.target.value;

		this.setState({search: search});

		clearTimeout(this.searchTimeout);

		if(search.length === 0) {
			return;
		}

		this.searchTimeout = setTimeout(() => {
			countriesService.byName(search).then(response => {
				if(response.length > 10) {
					this.setState({notification: 'too many matches, specify another filter'});
				} else {
					this.setState({countries: response});
				}
			})
		}, 300);
	}

	handleCountryClick(country) {
		this.setState({viewCountry: country});
	}

	handleOnBackClick() {
		this.setState({viewCountry: null});
	}

	render() {
		return <div>
			<Search value={this.state.search} onChange={this.handleSearchChange.bind(this)} />
			<Notification message={this.state.notification} />
			<Countries countries={this.state.countries} viewCountry={this.state.viewCountry} onBackClick={this.handleOnBackClick.bind(this)} onClick={this.handleCountryClick.bind(this)} />
		</div>
	}
}

export default App;
